/**
 * Clamps a value to the given bounds
 * @param v - The number value to clamp
 * @param max - The max number value to clamp too
 * @param min - The min number value to clamp too
 */
export function clamp(v: number, max: number, min: number = 0): number {
  return Math.max(min, Math.min(v, max));
}

/**
 * Finds a random integer between the given bounds
 * @param max - The max number value
 * @param min - The min number value
 * @param rFunc - The rounding function to use
 */
export function randInt(max: number = 1, min: number = 0, rFunc = Math.floor): number {
  return rFunc(randFloat(max, min));
}

/**
 * Finds a random float between the given bounds
 * @param max - The max number value
 * @param min - The min number value
 */
export function randFloat(max: number = 1, min: number = 0): number {
  return Math.random() * (max - min) + min;
}

/**
 * Rounds the given value to the given decimal place
 * @param v - The number value to round
 * @param dec - The decimal place to round to
 * @param rFunc - The rounding function to use
 */
export function roundToDec(v: number, dec: number = 2, rFunc = Math.floor): number {
  let d: number = Math.pow(10, dec);
  return rFunc(v * d) / d;
}

/**
 * Rounds to a given number
 * @param v - The number value to round
 * @param n - The number value to round to
 * @param rFunc - The rounding function to use
 */
export function roundTo(v: number, n: number, rFunc = Math.floor) {
  return rFunc(v / n) * n;
}
