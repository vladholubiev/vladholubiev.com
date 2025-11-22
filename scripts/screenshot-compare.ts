import fs from 'fs';
import path from 'path';
import {chromium, Page, Browser} from 'playwright';
import {PNG} from 'pngjs';
import pixelmatch from 'pixelmatch';

// Enums for better type safety
enum PageType {
  PAGE = 'page',
  ARTICLE = 'article',
}

enum DiffStatus {
  IDENTICAL = 'IDENTICAL',
  MINOR_DIFF = 'MINOR_DIFF',
  MAJOR_DIFF = 'MAJOR_DIFF',
}

// Configuration interface
interface Config {
  baseUrls: {
    localhost: string;
    production: string;
  };
  output: {
    directory: string;
    columnWidth: number;
    padding: number;
    headerHeight: number;
  };
  screenshot: {
    viewport: {width: number; height: number};
    timeout: number;
    scrollDistance: number;
    scrollDelay: number;
    postScrollDelay: number;
  };
  diff: {
    threshold: number;
    diffColor: [number, number, number];
    minorDiffThreshold: number;
  };
  pages: string[];
  articles: string[];
}

interface ComparisonResult {
  name: string;
  type: PageType;
  filename: string;
  width: number;
  height: number;
  diffPixels: number;
  diffPercentage: number;
}

// Centralized configuration
const CONFIG: Config = {
  baseUrls: {
    localhost: 'http://localhost:3001',
    production: 'https://vladholubiev.com',
  },
  output: {
    directory: './scripts/output',
    columnWidth: 1200,
    padding: 20,
    headerHeight: 50,
  },
  screenshot: {
    viewport: {width: 1200, height: 800},
    timeout: 30000,
    scrollDistance: 100,
    scrollDelay: 100,
    postScrollDelay: 1000,
  },
  diff: {
    threshold: 0.1,
    diffColor: [255, 0, 0],
    minorDiffThreshold: 1.0,
  },
  pages: [
    '', // home page
    'about',
    'articles',
    'projects',
    'speaking',
    'uses',
  ],
  articles: [
    '3x-smaller-lambda-artifacts-by-removing-junk-from-nodemodules',
    'aws-route53-how-to-share-subdomains-with-multiple-aws-accounts',
    'five-stages-of-ai-adoption',
    'five-ways-to-deal-with-aws-dynamodb-gsi-throttling',
    'how-to-scan-a-23-gb-dynamodb-table-in-one-minute',
    'how-to-speed-up-long-dynamodb-queries-by-2x',
    'running-libreoffice-in-aws-lambda-2022-edition-open-sourced',
  ],
};

// Utility functions
const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

function buildUrl(pagePath: string, type: PageType, baseUrl: string): string {
  if (type === PageType.ARTICLE) {
    return `${baseUrl}/articles/${pagePath}`;
  }
  return `${baseUrl}/${pagePath}`;
}

function getResultStatus(diffPercentage: number): DiffStatus {
  if (diffPercentage === 0) return DiffStatus.IDENTICAL;
  if (diffPercentage < CONFIG.diff.minorDiffThreshold) return DiffStatus.MINOR_DIFF;
  return DiffStatus.MAJOR_DIFF;
}

function formatStatusForDisplay(status: DiffStatus): string {
  switch (status) {
    case DiffStatus.IDENTICAL:
      return '✅ IDENTICAL';
    case DiffStatus.MINOR_DIFF:
      return '⚠️  MINOR DIFF';
    case DiffStatus.MAJOR_DIFF:
      return '❌ MAJOR DIFF';
  }
}

async function scrollAndLoadImages(page: Page): Promise<void> {
  const {scrollDistance, scrollDelay, postScrollDelay} = CONFIG.screenshot;

  // Scroll to load all images and content
  await page.evaluate(
    async ({distance, delay}) => {
      await new Promise<void>(resolve => {
        let totalHeight = 0;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, delay);
      });
    },
    {distance: scrollDistance, delay: scrollDelay}
  );

  // Wait for all images to load
  await page.evaluate(async () => {
    const images = Array.from(document.images);
    await Promise.all(
      images.map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise<void>((resolve, reject) => {
          img.addEventListener('load', () => resolve());
          img.addEventListener('error', () => reject());
        });
      })
    );
  });

  // Scroll back to top
  await page.evaluate(() => window.scrollTo(0, 0));

  // Give a bit more time for any lazy loading
  await delay(postScrollDelay);
}

// Image processing utilities
function createTextLabel(text: string, width: number, height: number): PNG {
  const canvas = new PNG({width, height});

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

function resizeImageToCanvas(sourceImage: PNG, targetWidth: number, targetHeight: number): PNG {
  const resizedImage = new PNG({width: targetWidth, height: targetHeight});
  resizedImage.data.fill(255); // Fill with white background
  PNG.bitblt(sourceImage, resizedImage, 0, 0, sourceImage.width, sourceImage.height, 0, 0);
  return resizedImage;
}

function createComparisonGrid(localhost: PNG, production: PNG, diff: PNG): PNG {
  const {columnWidth, padding, headerHeight} = CONFIG.output;
  const width = Math.max(localhost.width, production.width);
  const height = Math.max(localhost.height, production.height);

  // Create resized images
  const resizedLocalhost = resizeImageToCanvas(localhost, width, height);
  const resizedProduction = resizeImageToCanvas(production, width, height);
  const resizedDiff = resizeImageToCanvas(diff, width, height);

  // Calculate total grid dimensions
  const totalWidth = columnWidth * 3 + padding * 4; // 3 columns + 4 padding spaces
  const totalHeight = headerHeight + padding * 2 + height; // Header + padding + image

  // Create the main canvas
  const grid = new PNG({width: totalWidth, height: totalHeight});
  grid.data.fill(255);

  // Create headers
  const localhostHeader = createTextLabel('LOCALHOST:3001', columnWidth, headerHeight);
  const productionHeader = createTextLabel('VLADHOLUBIEV.COM', columnWidth, headerHeight);
  const diffHeader = createTextLabel('DIFF', columnWidth, headerHeight);

  // Calculate column positions
  const x1 = padding;
  const x2 = padding + columnWidth + padding;
  const x3 = padding + columnWidth + padding + columnWidth + padding;
  const imageY = headerHeight + padding * 2;

  // Place headers
  PNG.bitblt(localhostHeader, grid, 0, 0, columnWidth, headerHeight, x1, padding);
  PNG.bitblt(productionHeader, grid, 0, 0, columnWidth, headerHeight, x2, padding);
  PNG.bitblt(diffHeader, grid, 0, 0, columnWidth, headerHeight, x3, padding);

  // Place images
  PNG.bitblt(resizedLocalhost, grid, 0, 0, width, height, x1, imageY);
  PNG.bitblt(resizedProduction, grid, 0, 0, width, height, x2, imageY);
  PNG.bitblt(resizedDiff, grid, 0, 0, width, height, x3, imageY);

  return grid;
}

// Core business logic functions
async function takeScreenshot(page: Page, url: string): Promise<Buffer> {
  await page.goto(url, {
    waitUntil: 'networkidle',
    timeout: CONFIG.screenshot.timeout,
  });
  await scrollAndLoadImages(page);
  return await page.screenshot({fullPage: true});
}

interface ImageDiffResult {
  width: number;
  height: number;
  diffPixels: number;
  diffPercentage: number;
  diffImage: PNG;
}

function createImageDiff(localhost: PNG, production: PNG): ImageDiffResult {
  const width = Math.max(localhost.width, production.width);
  const height = Math.max(localhost.height, production.height);

  // Resize images to same dimensions
  const resizedLocalhost = resizeImageToCanvas(localhost, width, height);
  const resizedProduction = resizeImageToCanvas(production, width, height);
  const diff = new PNG({width, height});

  // Calculate diff
  const numDiffPixels: number = pixelmatch(
    resizedLocalhost.data,
    resizedProduction.data,
    diff.data,
    width,
    height,
    {
      threshold: CONFIG.diff.threshold,
      diffColor: CONFIG.diff.diffColor,
    }
  );

  const diffPercentage: number = parseFloat(((numDiffPixels / (width * height)) * 100).toFixed(2));

  return {
    width,
    height,
    diffPixels: numDiffPixels,
    diffPercentage,
    diffImage: diff,
  };
}

function saveComparisonResult(
  localhost: PNG,
  production: PNG,
  diffResult: ImageDiffResult,
  name: string
): string {
  const grid: PNG = createComparisonGrid(localhost, production, diffResult.diffImage);

  const filename = `${name}_comparison.png`;
  const filepath = path.join(CONFIG.output.directory, filename);
  fs.writeFileSync(filepath, PNG.sync.write(grid));

  return filename;
}

async function processPage(
  pagePath: string,
  name: string,
  type: PageType
): Promise<ComparisonResult | null> {
  const displayName = name || 'home';
  console.log(`Processing ${type}: ${displayName}`);

  const browser: Browser = await chromium.launch({headless: true});
  const page: Page = await browser.newPage();
  await page.setViewportSize(CONFIG.screenshot.viewport);

  try {
    // Construct URLs
    const localhostUrl = buildUrl(pagePath, type, CONFIG.baseUrls.localhost);
    const productionUrl = buildUrl(pagePath, type, CONFIG.baseUrls.production);

    // Take screenshots
    console.log(`  - Taking localhost screenshot...`);
    const localhostBuffer = await takeScreenshot(page, localhostUrl);

    console.log(`  - Taking production screenshot...`);
    const productionBuffer = await takeScreenshot(page, productionUrl);

    // Process images
    console.log(`  - Processing images...`);
    const localhost: PNG = PNG.sync.read(localhostBuffer);
    const production: PNG = PNG.sync.read(productionBuffer);

    // Create diff
    const diffResult = createImageDiff(localhost, production);

    // Save comparison grid
    console.log(`  - Creating comparison grid...`);
    const filename = saveComparisonResult(localhost, production, diffResult, displayName);

    const result: ComparisonResult = {
      name: displayName,
      type,
      filename,
      width: diffResult.width,
      height: diffResult.height,
      diffPixels: diffResult.diffPixels,
      diffPercentage: diffResult.diffPercentage,
    };

    console.log(`  - Dimensions: ${diffResult.width}x${diffResult.height}`);
    console.log(
      `  - Different pixels: ${diffResult.diffPixels.toLocaleString()} (${diffResult.diffPercentage}%)`
    );
    console.log(`  - Saved: ${path.join(CONFIG.output.directory, filename)}`);
    console.log('');

    return result;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`  - Error processing ${displayName}: ${errorMessage}`);
    console.log('');
    return null;
  } finally {
    await browser.close();
  }
}

async function takeScreenshots(): Promise<void> {
  console.log('Starting screenshot comparison process...\n');

  // Process main pages and articles in parallel
  const mainPagePromises: Promise<ComparisonResult | null>[] = CONFIG.pages.map(page =>
    processPage(page, page || 'home', PageType.PAGE)
  );
  const articlePromises: Promise<ComparisonResult | null>[] = CONFIG.articles.map(article =>
    processPage(article, article, PageType.ARTICLE)
  );

  const results: (ComparisonResult | null)[] = await Promise.all([
    ...mainPagePromises,
    ...articlePromises,
  ]);

  // Filter out null results (errors)
  const validResults: ComparisonResult[] = results.filter(
    (result): result is ComparisonResult => result !== null
  );

  // Create summary
  console.log('=== SUMMARY ===');
  console.log('');

  const sortedResults: ComparisonResult[] = validResults.sort(
    (a, b) => b.diffPercentage - a.diffPercentage
  );

  sortedResults.forEach(result => {
    const status = getResultStatus(result.diffPercentage);
    const statusDisplay = formatStatusForDisplay(status);

    const displayName =
      result.type === PageType.PAGE ? `/${result.name}` : `/articles/${result.name}`;
    console.log(`${statusDisplay} ${displayName}`);
    console.log(
      `           ${result.diffPixels.toLocaleString()} pixels (${result.diffPercentage}%)`
    );
    console.log(`           File: ${result.filename}`);
    console.log('');
  });

  const pageResults: ComparisonResult[] = validResults.filter(r => r.type === PageType.PAGE);
  const articleResults: ComparisonResult[] = validResults.filter(r => r.type === PageType.ARTICLE);
  const totalDifferentPages: number = pageResults.filter(r => r.diffPercentage > 0).length;
  const totalDifferentArticles: number = articleResults.filter(r => r.diffPercentage > 0).length;

  console.log(`Total pages with differences: ${totalDifferentPages}/${pageResults.length}`);
  console.log(
    `Total articles with differences: ${totalDifferentArticles}/${articleResults.length}`
  );
  console.log(`All comparison images saved to: ${CONFIG.output.directory}/`);
}

takeScreenshots().catch(console.error);
