"use strict";

/** A {@Point} represented by an X, Y, and Z value */
interface Point {
  /** The X value of the Point */
  x: number;
  /** The Y value of the Point */
  y: number;
  /** The Z value of the Point */
  z?: number;
}

/** Class representing a Vector2 */
export class Vector2 implements Point {
  public x: number;
  public y: number;

  /**
   * Creates a {@link Vector2}
   * @param a - Either a number to be used as the xy value or a {@link Vector2}
   * @param b - A number to be used as the y value
   */
  public constructor(a: number|Vector2 = 0, b?: number) {
    let {x, y} = this.parseParameters(a, b);
    this.x = x;
    this.y = y;
  }

  /** The Magnitude of this */
  public get magnitude(): number {
    return Math.sqrt(this.sqrMagnitude);
  }

  /** The Magnitude Squared of this */
  public get sqrMagnitude(): number {
    return this.x * this.x + this.y * this.y;
  }

  /** The normalized {@link Vector2} of this */
   public get normalized(): Vector2 {
     return new Vector2(this).normalize();
   }

  /**
   * Sets the xy value of the {@link Vector2}
   * @param x - A number to be used as the x value
   * @param y - A number to be used as the y value
   */
  public set(x: number, y: number): this {
    this.x = x;
    this.y = y;
    return this;
  }

  /** Normalizes the xy value of the {@link Vector2} */
  public normalize(): this {
    return this.div(this.magnitude);
  }

  /**
   * Performs subtraction on the {@link Vector2}
   * @param a - Either a number to be used as the xy value or a {@link Vector2}
   * @param b - A number to be used as the y value
   */
  public sub(a: Vector2|number, b?: number): this {
    let {x, y} = this.parseParameters(a, b);
    this.x -= x;
    this.y -= y;
    return this;
  }

  /**
   * Performs addition on the {@link Vector2}
   * @param a - Either a number to be used as the xy value or a {@link Vector2}
   * @param b - A number to be used as the y value
   */
  public add(a: Vector2|number, b?: number): this {
    let {x, y} = this.parseParameters(a, b);
    this.x += x;
    this.y += y;
    return this;
  }

  /**
   * Performs multiplication on the {@link Vector2}
   * @param a - Either a number to be used as the xy value or a {@link Vector2}
   * @param b - A number to be used as the y value
   */
  public mult(a: Vector2|number, b?: number): this {
    let {x, y} = this.parseParameters(a, b);
    this.x *= x;
    this.y *= y;
    return this;
  }

  /**
   * Performs division on the {@link Vector2}
   * @param a - Either a number to be used as the xy value or a {@link Vector2}
   * @param b - A number to be used as the y value
   */
  public div(a: Vector2|number, b?: number): this {
    let {x, y} = this.parseParameters(a, b);
    this.x /= x;
    this.y /= y;
    return this;
  }

  /**
   * Evaluates if two {@link Vector2}s are equal
   * @param other - The {@link Vector2} to compare with
   */
  public equals(other: Vector2): boolean {
    return this.x === other.x && this.y === other.y;
  }

  /**
   * Finds the {@link Point} provided by the arguments
   * @param a - Either a number to be used as the xy value or a {@link Vector2}
   * @param b - A number to be used as the y value
   */
  private parseParameters(a: number|Vector2, b?: number): Point {
    return Vector2.parseParameters(a, b);
  }

  /** A {@link Vector2} with the value of 0, -1 */
  public static get up(): Vector2 {
    return new Vector2(0, -1);
  }

  /** A {@link Vector2} with the value of 0, 1 */
  public static get down(): Vector2 {
    return new Vector2(0, 1);
  }

  /** A {@link Vector2} with the xy value of -1, 0 */
  public static get left(): Vector2 {
    return new Vector2(-1, 0);
  }

  /** A {@link Vector2} with the xy value of 1, 0 */
  public static get right(): Vector2 {
    return new Vector2(1, 0);
  }

  /**
   * Finds the sum of two {@link Vector2}s
   * @param a - A {@link Vector2}
   * @param b - A {@link Vector2}
   */
  public static add(a: Vector2, b: Vector2): Vector2 {
    return new Vector2(a).add(b);
  }

  /**
   * Finds the difference of two {@link Vector2}s
   * @param a - A {@link Vector2}
   * @param b - A {@link Vector2}
   */
  public static sub(a: Vector2, b: Vector2): Vector2 {
    return new Vector2(a).sub(b);
  }

  /**
   * Finds the product of two {@link Vector2}s
   * @param a - A {@link Vector2}
   * @param b - A {@link Vector2}
   */
  public static mult(a: Vector2, b: Vector2): Vector2 {
    return new Vector2(a).mult(b);
  }

  /**
   * Finds the quotient of two {@link Vector2}s
   * @param a - A {@link Vector2}
   * @param b - A {@link Vector2}
   */
  public static div(a: Vector2, b: Vector2): Vector2 {
    return new Vector2(a).div(b);
  }

  /**
   * Finds the {@link Point} provided by the arguments
   * @param a - Either a number to be used as the xy value or a {@link Vector2}
   * @param b - A number to be used as the y value
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
   * Creates a {@link Vector3}
   * @param a - Either a number to be used as the xyz value or a {@link Vector3}
   * @param b - A number to be used as the y value
   * @param c - A number to be used as the z value
   */
  public constructor(a: number|Vector3 = 0, b?: number, c?: number) {
    let {x, y, z} = this.parseParameters(a, b, c);
    this.x = x;
    this.y = y;
    this.z = z as number;
  }

  /** The Magnitude of this */
  public get magnitude(): number {
    return Math.sqrt(this.sqrMagnitude);
  }

  /** The Magnitude Squared of this */
  public get sqrMagnitude(): number {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }

  /** The Normalized {@link Vector3} of this */
  public get normalized(): Vector3 {
    return new Vector3(this).normalize();
  }

  /** Normalizes the {@link Vector3} */
  public normalize(): this {
    return this.div(this.magnitude);
  }

  /**
   * Performs division on the {@link Vector3}
   * @param a - Either a number to be used as the xyz value or a {@link Vector3}
   * @param b - A number to be used as the y value
   * @param c - A number to be used as the z value
   */
  public div(a: number|Vector3, b?: number, c?: number): this {
    let {x, y, z} = this.parseParameters(a, b, c);
    this.x /= x;
    this.y /= y;
    this.z /= z as number;
    return this;
  }

  /**
   * Performs multiplication on the {@link Vector3}
   * @param a - Either a number to be used as the xyz value or a {@link Vector3}
   * @param b - A number to be used as the y value
   * @param c - A number to be used as the z value
   */
  public mult(a: number|Vector3, b?: number, c?: number): this {
    let {x, y, z} = this.parseParameters(a, b, c);
    this.x *= x;
    this.y *= y;
    this.z *= z as number;
    return this;
  }

  /**
   * Performs addition on the {@link Vector3}
   * @param a - Either a number to be used as the xyz value or a {@link Vector3}
   * @param b - A number to be used as the y value
   * @param c - A number to be used as the z value
   */
  public add(a: number|Vector3, b?: number, c?: number): this {
    let {x, y, z} = this.parseParameters(a, b, c);
    this.x += x;
    this.y += y;
    this.z += z as number;
    return this;
  }

  /**
   * Performs subtraction on the {@link Vector3}
   * @param a - Either a number to be used as the xyz value or a {@link Vector3}
   * @param b - A number to be used as the y value
   * @param c - A number to be used as the z value
   */
  public sub(a: number|Vector3, b?: number, c?: number): this {
    let {x, y, z} = this.parseParameters(a, b, c);
    this.x -= x;
    this.y -= y;
    this.z -= z as number;
    return this;
  }

  /**
   * Sets the xyz value of the {@link Vector3}
   * @param x - A number to be used as the x value
   * @param y - A number to be used as the y value
   * @param z - A number to be used as the z value
   */
  public set(x: number, y: number, z: number): this {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }

  /**
   * Evaluates if two {@link Vector3}s are equal
   * @param other - The {@link Vector3} to compare with
   */
  public equals(other: Vector3): boolean {
    return this.x === other.x && this.y === other.y && this.z === other.z;
  }

  /** Converts the {@link Vector3} to an {@link Array} */
  public toArray(): number[] {
    return [this.x, this.y, this.z];
  }

  /** Converts the {@link Vector3} to a {@link String} */
  public toString(): string {
    return this.toArray().toString();
  }

  /**
   * Finds the {@type Point} provided by the arguments
   * @param a - Either a number to be used as the xyz value or a {@link Vector3}
   * @param b - A number to be used as the y value
   * @param c - A number to be used as the z value
   */
  private parseParameters(a: number|Vector3, b?: number, c?: number): Point {
    return Vector3.parseParameters(a, b, c);
  }

  /** A {@link Vector3} with the xyz value of 0, -1, 0 */
  public static get up(): Vector3 {
    return new Vector3(0, -1, 0);
  }

  /** A {@link Vector3} with the xyz value of 0, 1, 0 */
  public static get down(): Vector3 {
    return new Vector3(0, 1, 0);
  }

  /** A {@link Vector3} with the xyz value of -1, 0, 0 */
  public static get left(): Vector3 {
    return new Vector3(-1, 0, 0);
  }

  /** A {@link Vector3} with the xyz value of 1, 0, 0 */
  public static get right(): Vector3 {
    return new Vector3(1, 0, 0);
  }

  /** A {@link Vector3} with the xyz value of 0, 0, -1 */
  public static get back(): Vector3 {
    return new Vector3(0, 0, -1);
  }

  /** A {@link Vector3} with the xyz value of 0, 0, 1 */
  public static get forth(): Vector3 {
    return new Vector3(0, 0, 1);
  }

  /**
   * Finds the quotient of two {@link Vector3}s
   * @param a - A {@link Vector3}
   * @param b - A {@link Vector3}
   */
  public static div(a: Vector3, b: Vector3): Vector3 {
    return new Vector3(a).div(b);
  }

  /**
   * Finds the product of two {@link Vector3}s
   * @param a - A {@link Vector3}
   * @param b - A {@link Vector3}
   */
  public static mult(a: Vector3, b: Vector3): Vector3 {
    return new Vector3(a).mult(b);
  }

  /**
   * Finds the difference of two {@link Vector3}s
   * @param a - A {@link Vector3}
   * @param b - A {@link Vector3}
   */
  public static sub(a: Vector3, b: Vector3): Vector3 {
    return new Vector3(a).sub(b);
  }

  /**
   * Finds the sum of two {@link Vector3}s
   * @param a - A {@link Vector3}
   * @param b - A {@link Vector3}
   */
  public static add(a: Vector3, b: Vector3): Vector3 {
    return new Vector3(a).add(b);
  }

  /**
   * Finds the {@link Point} provided by the arguments
   * @param a - Either a number to be used as the xyz value or a {@link Vector3}
   * @param b - A number to be used as the y value
   * @param c - A number to be used as the z value
   */
  private static parseParameters(a: number|Vector3, b?: number, c?: number): Point {
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
