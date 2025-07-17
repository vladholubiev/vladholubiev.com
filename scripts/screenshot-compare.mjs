import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

const articles = [
  '3x-smaller-lambda-artifacts-by-removing-junk-from-nodemodules',
  'aws-route53-how-to-share-subdomains-with-multiple-aws-accounts',
  'five-ways-to-deal-with-aws-dynamodb-gsi-throttling',
  'how-to-scan-a-23-gb-dynamodb-table-in-one-minute',
  'how-to-speed-up-long-dynamodb-queries-by-2x',
  'running-libreoffice-in-aws-lambda-2022-edition-open-sourced'
];

const OUTPUT_DIR = './scripts/output';
const COLUMN_WIDTH = 1200;
const PADDING = 20;
const HEADER_HEIGHT = 50;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function createTextLabel(text, width, height) {
  const canvas = new PNG({ width, height });
  
  // Fill with white background
  canvas.data.fill(255);
  
  // Add a simple border
  for (let x = 0; x < width; x++) {
    // Top and bottom borders
    const topIdx = (width * 0 + x) << 2;
    const bottomIdx = (width * (height - 1) + x) << 2;
    canvas.data[topIdx] = canvas.data[topIdx + 1] = canvas.data[topIdx + 2] = 0;
    canvas.data[bottomIdx] = canvas.data[bottomIdx + 1] = canvas.data[bottomIdx + 2] = 0;
  }
  
  for (let y = 0; y < height; y++) {
    // Left and right borders
    const leftIdx = (width * y + 0) << 2;
    const rightIdx = (width * y + (width - 1)) << 2;
    canvas.data[leftIdx] = canvas.data[leftIdx + 1] = canvas.data[leftIdx + 2] = 0;
    canvas.data[rightIdx] = canvas.data[rightIdx + 1] = canvas.data[rightIdx + 2] = 0;
  }
  
  return canvas;
}

function createComparisonGrid(localhost, production, diff, article) {
  const width = Math.max(localhost.width, production.width);
  const height = Math.max(localhost.height, production.height);
  
  // Create resized images
  const resizedLocalhost = new PNG({ width, height });
  const resizedProduction = new PNG({ width, height });
  const resizedDiff = new PNG({ width, height });
  
  // Fill with white background
  resizedLocalhost.data.fill(255);
  resizedProduction.data.fill(255);
  resizedDiff.data.fill(255);
  
  // Copy images
  PNG.bitblt(localhost, resizedLocalhost, 0, 0, localhost.width, localhost.height, 0, 0);
  PNG.bitblt(production, resizedProduction, 0, 0, production.width, production.height, 0, 0);
  PNG.bitblt(diff, resizedDiff, 0, 0, diff.width, diff.height, 0, 0);
  
  // Calculate total grid dimensions
  const totalWidth = (COLUMN_WIDTH * 3) + (PADDING * 4); // 3 columns + 4 padding spaces
  const totalHeight = HEADER_HEIGHT + PADDING * 2 + height; // Header + padding + image
  
  // Create the main canvas
  const grid = new PNG({ width: totalWidth, height: totalHeight });
  grid.data.fill(255);
  
  // Create headers
  const localhostHeader = createTextLabel('LOCALHOST:3001', COLUMN_WIDTH, HEADER_HEIGHT);
  const productionHeader = createTextLabel('VLADHOLUBIEV.COM', COLUMN_WIDTH, HEADER_HEIGHT);
  const diffHeader = createTextLabel('DIFF', COLUMN_WIDTH, HEADER_HEIGHT);
  
  // Place headers
  PNG.bitblt(localhostHeader, grid, 0, 0, COLUMN_WIDTH, HEADER_HEIGHT, PADDING, PADDING);
  PNG.bitblt(productionHeader, grid, 0, 0, COLUMN_WIDTH, HEADER_HEIGHT, PADDING + COLUMN_WIDTH + PADDING, PADDING);
  PNG.bitblt(diffHeader, grid, 0, 0, COLUMN_WIDTH, HEADER_HEIGHT, PADDING + COLUMN_WIDTH + PADDING + COLUMN_WIDTH + PADDING, PADDING);
  
  // Place images
  const imageY = HEADER_HEIGHT + PADDING * 2;
  const x1 = PADDING;
  const x2 = PADDING + COLUMN_WIDTH + PADDING;
  const x3 = PADDING + COLUMN_WIDTH + PADDING + COLUMN_WIDTH + PADDING;
  
  PNG.bitblt(resizedLocalhost, grid, 0, 0, width, height, x1, imageY);
  PNG.bitblt(resizedProduction, grid, 0, 0, width, height, x2, imageY);
  PNG.bitblt(resizedDiff, grid, 0, 0, width, height, x3, imageY);
  
  return grid;
}

async function takeScreenshots() {
  console.log('Starting screenshot comparison process...\n');
  
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1200, height: 800 });
  
  const results = [];
  
  for (const article of articles) {
    console.log(`Processing: ${article}`);
    
    try {
      // Take screenshots
      console.log(`  - Taking localhost screenshot...`);
      await page.goto(`http://localhost:3001/articles/${article}`, { 
        waitUntil: 'networkidle',
        timeout: 30000 
      });
      await delay(2000);
      const localhostBuffer = await page.screenshot({ fullPage: true });
      
      console.log(`  - Taking production screenshot...`);
      await page.goto(`https://vladholubiev.com/articles/${article}`, { 
        waitUntil: 'networkidle',
        timeout: 30000 
      });
      await delay(2000);
      const productionBuffer = await page.screenshot({ fullPage: true });
      
      // Process images
      console.log(`  - Processing images...`);
      const localhost = PNG.sync.read(localhostBuffer);
      const production = PNG.sync.read(productionBuffer);
      
      // Create diff
      const width = Math.max(localhost.width, production.width);
      const height = Math.max(localhost.height, production.height);
      
      const resizedLocalhost = new PNG({ width, height });
      const resizedProduction = new PNG({ width, height });
      const diff = new PNG({ width, height });
      
      // Fill with white background
      resizedLocalhost.data.fill(255);
      resizedProduction.data.fill(255);
      
      // Copy images
      PNG.bitblt(localhost, resizedLocalhost, 0, 0, localhost.width, localhost.height, 0, 0);
      PNG.bitblt(production, resizedProduction, 0, 0, production.width, production.height, 0, 0);
      
      // Calculate diff
      const numDiffPixels = pixelmatch(
        resizedLocalhost.data, 
        resizedProduction.data, 
        diff.data, 
        width, 
        height, 
        {
          threshold: 0.1,
          diffColor: [255, 0, 0]
        }
      );
      
      const diffPercentage = ((numDiffPixels / (width * height)) * 100).toFixed(2);
      
      // Create comparison grid
      console.log(`  - Creating comparison grid...`);
      const grid = createComparisonGrid(localhost, production, diff, article);
      
      // Save the grid
      const filename = `${article}_comparison.png`;
      const filepath = path.join(OUTPUT_DIR, filename);
      fs.writeFileSync(filepath, PNG.sync.write(grid));
      
      const result = {
        article,
        filename,
        width,
        height,
        diffPixels: numDiffPixels,
        diffPercentage: parseFloat(diffPercentage)
      };
      
      results.push(result);
      
      console.log(`  - Dimensions: ${width}x${height}`);
      console.log(`  - Different pixels: ${numDiffPixels.toLocaleString()} (${diffPercentage}%)`);
      console.log(`  - Saved: ${filepath}`);
      console.log('');
      
    } catch (error) {
      console.error(`  - Error processing ${article}: ${error.message}`);
      console.log('');
    }
  }
  
  await browser.close();
  
  // Create summary
  console.log('=== SUMMARY ===');
  console.log('');
  
  const sortedResults = results.sort((a, b) => b.diffPercentage - a.diffPercentage);
  
  sortedResults.forEach(result => {
    const status = result.diffPercentage === 0 ? '✅ IDENTICAL' : 
                   result.diffPercentage < 1 ? '⚠️  MINOR DIFF' : 
                   '❌ MAJOR DIFF';
    
    console.log(`${status} ${result.article}`);
    console.log(`           ${result.diffPixels.toLocaleString()} pixels (${result.diffPercentage}%)`);
    console.log(`           File: ${result.filename}`);
    console.log('');
  });
  
  const totalDifferentArticles = results.filter(r => r.diffPercentage > 0).length;
  console.log(`Total articles with differences: ${totalDifferentArticles}/${results.length}`);
  console.log(`All comparison images saved to: ${OUTPUT_DIR}/`);
}

takeScreenshots().catch(console.error);