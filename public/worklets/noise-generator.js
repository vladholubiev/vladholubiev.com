class NoiseGeneratorProcessor extends AudioWorkletProcessor {
  constructor() {
    super();

    this.noiseType = 'pink';
    this.shouldStop = false;

    // Pink noise filter state.
    this.b0 = 0;
    this.b1 = 0;
    this.b2 = 0;
    this.b3 = 0;
    this.b4 = 0;
    this.b5 = 0;
    this.b6 = 0;

    // Brown noise integration state.
    this.brownLast = 0;

    this.port.onmessage = event => {
      const data = event?.data ?? {};

      if (data?.type === 'setNoiseType') {
        if (data.noiseType === 'white' || data.noiseType === 'pink' || data.noiseType === 'brown') {
          this.noiseType = data.noiseType;
        }
        return;
      }

      if (data?.type === 'dispose') {
        this.shouldStop = true;
      }
    };
  }

  process(_inputs, outputs) {
    if (this.shouldStop) return false;

    const output = outputs[0];
    if (!output || output.length === 0) return true;

    const frames = output[0].length;

    for (let i = 0; i < frames; i += 1) {
      const white = Math.random() * 2 - 1;
      let sample = white;

      if (this.noiseType === 'brown') {
        const brown = (this.brownLast + 0.02 * white) / 1.02;
        this.brownLast = brown;
        sample = brown * 3.5;
      } else if (this.noiseType === 'pink') {
        // https://www.firstpr.com.au/dsp/pink-noise/ - Paul Kellet
        this.b0 = 0.99886 * this.b0 + white * 0.0555179;
        this.b1 = 0.99332 * this.b1 + white * 0.0750759;
        this.b2 = 0.969 * this.b2 + white * 0.153852;
        this.b3 = 0.8665 * this.b3 + white * 0.3104856;
        this.b4 = 0.55 * this.b4 + white * 0.5329522;
        this.b5 = -0.7616 * this.b5 - white * 0.016898;

        sample =
          this.b0 + this.b1 + this.b2 + this.b3 + this.b4 + this.b5 + this.b6 + white * 0.5362;
        sample *= 0.11;
        this.b6 = white * 0.115926;
      }

      for (let ch = 0; ch < output.length; ch += 1) {
        output[ch][i] = sample;
      }
    }

    return true;
  }
}

registerProcessor('noise-generator', NoiseGeneratorProcessor);
