import noisejs from 'noisejs';

const perlinnoise = new noisejs.Noise(Math.random());

export function noise(x, y) {
    return perlinnoise.perlin2(x, y);
  }
