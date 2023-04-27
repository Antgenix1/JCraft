// Import the noisejs library
import noisejs from 'noisejs';

// Create a new Perlin noise generator with a random seed
const perlinnoise = new noisejs.Noise(Math.random());

// Define a function that takes in x and y coordinates and returns a Perlin noise value at that point
export function noise(x, y) {
    return perlinnoise.perlin2(x, y);
}