"use strict";
/**
 * @fileOverview Core file of FFGUtils
 * @author Drake Taylor
 * @version 1.0.0
 */

interface Point {
  /**
   * The X value of the Point
   */
  x: number;
  /**
   * The Y value of the Point
   */
  y: number;
  /**
   * The Z value of the Point
   */
  z?: number;
}

/** Class representing a Vector2 */
export class Vector2 implements Point {
  public x: number;
  public y: number;

  /**
   * Creates a Vector2
   * @param {number | Vector2} a - Either a number to be used as the xy value or a Vector2
   * @param {number} [b] - A number to be used as the y value
   */
  public constructor(a: number|Vector2 = 0, b?: number) {
    let {x, y} = this.parseParameters(a, b);
    this.x = x;
    this.y = y;
  }

  /**
   * Calculates the magnitude of the xy value
   * @returns {number} The magnitude of the Vector2
   */
  public get magnitude(): number {
    return Math.sqrt(this.sqrMagnitude);
  }

  /**
   * Calculates the sqrMagnitude of the xy value
   * @returns {number} The magnitude squared of the Vector2
   */
  public get sqrMagnitude(): number {
    return this.x * this.x + this.y * this.y;
  }

  /**
   * Calculates the normalized Vector2 of this Vector2
   * @returns {Vector2} The normalized Vector2 of this
   */
   public get normalized(): Vector2 {
     return new Vector2(this).normalize();
   }

  /**
   * Sets the xy value of the Vector2
   * @param {number} x - A number to be used as the x value
   * @param {number} y - A number to be used as the y value
   * @returns {Vector2} The Vector2 after being modified
   */
  public set(x: number, y: number): this {
    this.x = x;
    this.y = y;
    return this;
  }

  /**
   * Normalizes the xy value of the Vector2
   * @returns {Vector2} The Vector2 after being modified
   */
  public normalize(): this {
    return this.div(this.magnitude);
  }

  /**
   * Performs subtraction on the Vector2
   * @param {number | Vector2} a - Either a number to be used as the xy value or a Vector2
   * @param {number} [b] - A number to be used as the y value
   * @returns {Vector2} The Vector2 after being modified
   */
  public sub(a: Vector2|number, b?: number): this {
    let {x, y} = this.parseParameters(a, b);
    this.x -= x;
    this.y -= y;
    return this;
  }

  /**
   * Performs addition on the Vector2
   * @param {number | Vector2} a - Either a number to be used as the xy value or a Vector2
   * @param {number} [b] - A number to be used as the y value
   * @returns {Vector2} The Vector2 after being modified
   */
  public add(a: Vector2|number, b?: number): this {
    let {x, y} = this.parseParameters(a, b);
    this.x += x;
    this.y += y;
    return this;
  }

  /**
   * Performs multiplication on the Vector2
   * @param {number | Vector2} a - Either a number to be used as the xy value or a Vector2
   * @param {number} [b] - A number to be used as the y value
   * @returns {Vector2} The Vector2 after being modified
   */
  public mult(a: Vector2|number, b?: number): this {
    let {x, y} = this.parseParameters(a, b);
    this.x *= x;
    this.y *= y;
    return this;
  }

  /**
   * Performs division on the Vector2
   * @param {number | Vector2} a - Either a number to be used as the xy value or a Vector2
   * @param {number} [b] - A number to be used as the y value
   * @returns {Vector2} The Vector2 after being modified
   */
  public div(a: Vector2|number, b?: number): this {
    let {x, y} = this.parseParameters(a, b);
    this.x /= x;
    this.y /= y;
    return this;
  }

  /**
   * Evaluates if this Vector2 and other Vector2 are equal
   * @param {Vector2} other - A Vector2 to compare against this Vector2
   * @returns {boolean} Whether this equals other
   */
  public equals(other: Vector2): boolean {
    return this.x === other.x && this.y === other.y;
  }

  /**
   * Finds the Point provided by the arguments
   * @param {number | Vector2} a - Either a number to be used as the xy value or a Vector2
   * @param {number} [b] - A number to be used as the y value
   * @returns {Point} The Point provided
   */
  private parseParameters(a: number|Vector2, b?: number): Point {
    return Vector2.parseParameters(a, b);
  }

  /**
   * The Vector2 pointing up
   * @returns {Vector2} A Vector2 with the xy value 0, -1
   */
  public static get up(): Vector2 {
    return new Vector2(0, -1);
  }

  /**
   * The Vector2 pointing down
   * @returns {Vector2} A Vector2 with the xy value 0, 1
   */
  public static get down(): Vector2 {
    return new Vector2(0, 1);
  }

  /**
   * The Vector2 pointing left
   * @returns {Vector2} A Vector2 with the xy value -1, 0
   */
  public static get left(): Vector2 {
    return new Vector2(-1, 0);
  }

  /**
   * The Vector2 pointing right
   * @returns {Vector2} A Vector2 with the xy value 1, 0
   */
  public static get right(): Vector2 {
    return new Vector2(1, 0);
  }

  /**
   * Finds the sum of a and b
   * @param {Vector2} a - A Vector2
   * @param {Vector2} b - A Vector2
   * @returns {Vector2} The sum of a and b
   */
  public static add(a: Vector2, b: Vector2): Vector2 {
    return new Vector2(a).add(b);
  }

  /**
   * Finds the difference of a and b
   * @param {Vector2} a - A Vector2
   * @param {Vector2} b - A Vector2
   * @returns {Vector2} The difference of a and b
   */
  public static sub(a: Vector2, b: Vector2): Vector2 {
    return new Vector2(a).sub(b);
  }

  /**
   * Finds the product of a and b
   * @param {Vector2} a - A Vector2
   * @param {Vector2} b - A Vector2
   * @returns {Vector2} The product of a and b
   */
  public static mult(a: Vector2, b: Vector2): Vector2 {
    return new Vector2(a).mult(b);
  }

  /**
   * Finds the quotient of a and b
   * @param {Vector2} a - A Vector2
   * @param {Vector2} b - A Vector2
   * @returns {Vector2} The quotient of a and b
   */
  public static div(a: Vector2, b: Vector2): Vector2 {
    return new Vector2(a).div(b);
  }

  /**
   * Finds the Point provided by the arguments
   * @param {number | Vector2} a - Either a number to be used as the xy value or a Vector2
   * @param {number} [b] - A number to be used as the y value
   * @returns {Point} The Point provided
   */
  private static parseParameters(a: number|Vector2, b?: number): Point {
    let x: number;
    let y: number;
    if (a instanceof Vector2) {
      x = a.x;
      y = a.y;
    } else {
      x = a;
      y = b ? b : a;
    }
    return {x : x, y : y};
  }
}
/** A class representing a Vector3 */
export class Vector3 implements Point {
  public x: number;
  public y: number;
  public z: number;

  /**
   * Creates a Vector3
   * @param {number | Vector3} a - Either a number to be used as the xyz value or a Vector3
   * @param {number} [b] - A number to be used as the y value
   * @param {number} [c] - A number to be used as the z value
   */
  public constructor(a: number|Vector3 = 0, b?: number, c?: number) {
    let {x, y, z} = this.parseParameters(a, b, c);
    this.x = x;
    this.y = y;
    this.z = z as number;
  }

  /**
   * Calculates the magnitude of the Vector3
   * @returns {number} The magnitude of the Vector3
   */
  public get magnitude(): number {
    return Math.sqrt(this.sqrMagnitude);
  }

  /**
   * Calculates the sqrMagnitude of the Vector3
   * @returns {number} The magnitude squared of the Vector3
   */
  public get sqrMagnitude(): number {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }

  /**
   * Calculates the normalized Vector3 of this Vector3
   * @returns {Vector3} The normalized Vector3 of this
   */
  public get normalized(): Vector3 {
    return new Vector3(this).normalize();
  }

  /**
   * Normalizes the Vector3
   * @returns {Vector2} The Vector3 after being modified
   */
  public normalize(): this {
    return this.div(this.magnitude);
  }

  /**
   * Performs division on the Vector3
   * @param {number | Vector3} a - Either a number to be used as the xyz value or a Vector3
   * @param {number} [b] - A number to be used as the y value
   * @param {number} [c] - A number to be used as the z value
   * @returns {Vector3} The Vector3 after being modified
   */
  public div(a: number|Vector3, b?: number, c?: number): this {
    let {x, y, z} = this.parseParameters(a, b, c);
    this.x /= x;
    this.y /= y;
    this.z /= z as number;
    return this;
  }

  /**
   * Performs multiplication on the Vector3
   * @param {number | Vector3} a - Either a number to be used as the xyz value or a Vector3
   * @param {number} [b] - A number to be used as the y value
   * @param {number} [c] - A number to be used as the z value
   * @returns {Vector3} The Vector3 after being modified
   */
  public mult(a: number|Vector3, b?: number, c?: number): this {
    let {x, y, z} = this.parseParameters(a, b, c);
    this.x *= x;
    this.y *= y;
    this.z *= z as number;
    return this;
  }

  /**
   * Performs addition on the Vector3
   * @param {number | Vector3} a - Either a number to be used as the xyz value or a Vector3
   * @param {number} [b] - A number to be used as the y value
   * @param {number} [c] - A number to be used as the z value
   * @returns {Vector3} The Vector3 after being modified
   */
  public add(a: number|Vector3, b?: number, c?: number): this {
    let {x, y, z} = this.parseParameters(a, b, c);
    this.x += x;
    this.y += y;
    this.z += z as number;
    return this;
  }

  /**
   * Performs subtraction on the Vector3
   * @param {number | Vector3} a - Either a number to be used as the xyz value or a Vector3
   * @param {number} [b] - A number to be used as the y value
   * @param {number} [c] - A number to be used as the z value
   * @returns {Vector3} The Vector3 after being modified
   */
  public sub(a: number|Vector3, b?: number, c?: number): this {
    let {x, y, z} = this.parseParameters(a, b, c);
    this.x -= x;
    this.y -= y;
    this.z -= z as number;
    return this;
  }

  /**
   * Sets the xyz value of the Vector3
   * @param {number} x - A number to be used as the x value
   * @param {number} y - A number to be used as the y value
   * @param {number} z - A number to be used as the z value
   * @returns {Vector3} The Vector3 after being modified
   */
  public set(x: number, y: number, z: number): this {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }

  /**
   * Evaluates if this Vector3 and other Vector3 are equal
   * @param {Vector3} other - A Vector3 to compare against this Vector3
   * @returns {boolean} Whether this equals other
   */
  public equals(other: Vector3): boolean {
    return this.x === other.x && this.y === other.y && this.z === other.z;
  }

  /**
   * Converts the Vector3 to an Array
   * @returns {number[]} The Vector3 represented as an Array
   */
  public toArray(): number[] {
    return [this.x, this.y, this.z];
  }

  /**
   * Converts the Vector3 to a String
   * @returns {string} The Vector3 represented as a String
   */
  public toString(): string {
    return this.toArray().toString();
  }

  /**
   * Finds the Point provided by the arguments
   * @param {number | Vector3} a - Either a number to be used as the xyz value or a Vector3
   * @param {number} [b] - A number to be used as the y value
   * @param {number} [c] - A number to be used as the z value
   * @returns {Point} A point found from the arguments
   */
  private parseParameters(a: number|Vector3, b?: number, c?: number): Point {
    return Vector3.parseParameters(a, b, c);
  }

  /**
   * The Vector3 pointing up
   * @returns {Vector3} A Vector3 with the xyz value 0, -1, 0
   */
  public static get up(): Vector3 {
    return new Vector3(0, -1, 0);
  }

  /**
   * The Vector3 pointing down
   * @returns {Vector3} A Vector3 with the xyz value 0, 1, 0
   */
  public static get down(): Vector3 {
    return new Vector3(0, 1, 0);
  }

  /**
   * The Vector3 pointing left
   * @returns {Vector3} A Vector3 with the xyz value -1, 0, 0
   */
  public static get left(): Vector3 {
    return new Vector3(-1, 0, 0);
  }

  /**
   * The Vector3 pointing right
   * @returns {Vector3} A Vector3 with the xyz value 1, 0, 0
   */
  public static get right(): Vector3 {
    return new Vector3(1, 0, 0);
  }

  /**
   * The Vector3 pointing back
   * @returns {Vector3} A Vector3 with the xyz value 0, 0, -1
   */
  public static get back(): Vector3 {
    return new Vector3(0, 0, -1);
  }

  /**
   * The Vector3 pointing forth
   * @returns {Vector3} A Vector3 with the xyz value 0, 0, 1
   */
  public static get forth(): Vector3 {
    return new Vector3(0, 0, 1);
  }

  /**
   * Finds the quotient of a and b
   * @param {Vector3} a - A Vector3
   * @param {Vector3} b - A Vector3
   * @returns {Vector3} The quotient of a and b
   */
  public static div(a: Vector3, b: Vector3): Vector3 {
    return new Vector3(a).div(b);
  }

  /**
   * Finds the product of a and b
   * @param {Vector3} a - A Vector3
   * @param {Vector3} b - A Vector3
   * @returns {Vector3} The product of a and b
   */
  public static mult(a: Vector3, b: Vector3): Vector3 {
    return new Vector3(a).mult(b);
  }

  /**
   * Finds the difference of a and b
   * @param {Vector3} a - A Vector3
   * @param {Vector3} b - A Vector3
   * @returns {Vector3} The difference of a and b
   */
  public static sub(a: Vector3, b: Vector3): Vector3 {
    return new Vector3(a).sub(b);
  }

  /**
   * Finds the sum of a and b
   * @param {Vector3} a - A Vector3
   * @param {Vector3} b - A Vector3
   * @returns {Vector3} The sum of a and b
   */
  public static add(a: Vector3, b: Vector3): Vector3 {
    return new Vector3(a).add(b);
  }

  /**
   * Finds the Point provided by the arguments
   * @param {number | Vector3} a - Either a number to be used as the xyz value or a Vector3
   * @param {number} [b] - A number to be used as the y value
   * @param {number} [c] - A number to be used as the z value
   * @returns {Point} A point found from the arguments
   */
  public static parseParameters(a: number|Vector3, b?: number, c?: number): Point {
    let x: number;
    let y: number;
    let z: number;
    if (a instanceof Vector3) {
      x = a.x;
      y = a.y;
      z = a.z;
    } else {
      x = a;
      y = b ? b : a;
      z = c ? c : a;
    }
    return {x: x, y: y, z: z};
  }
}
