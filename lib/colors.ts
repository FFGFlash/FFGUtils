import {clamp} from "./fmath";

/** A hexadecimal string represented as #RRGGBBAA */
type hexadecimal = string;

/** An {@link RGBObject} containing red, green and blue information */
interface RGBObject {
  /** The color value the {@link RGBObject} was generated from */
  readonly color?: number;
  /** The red value */
  red: number;
  /** The green value */
  green: number;
  /** The blue value */
  blue: number;
}

/** An {@link ColorObject} containing color and alpha information */
interface ColorObject {
  /** The color value */
  color: number;
  /** The alpha value */
  alpha: number;
}

/** An {@link HSLObject} containing hue, saturation and lightness information */
interface HSLObject {
  /** The color value the {@link HSLObject} was generated from */
  readonly color?: number;
  /** The hue value */
  hue: number;
  /** The saturation level */
  saturation: number;
  /** The lightness level */
  lightness: number;
}

export enum ColorMode {
  /** RGB {@link ColorMode} represented with a Red, Green and Blue value */
  RGB=0,
  /** HSL {@link ColorMode} represented with a Hue, Saturation and Lightness value */
  HSL=1
}

/** Class representing a color */
export class Color {
  /** The Current ColorMode used to handle inputs */
  static colorMode: ColorMode = ColorMode.RGB;
  /** The color value */
  private c: number;
  /** The alpha value */
  private a: number;
  /** The last {@link HSLObject} */
  private lhsl: HSLObject|undefined;
  /** The last {@link RGBObject} */
  private lrgb: RGBObject|undefined;

  /**
   * Creates a new {@link Color}
   * @param a - Either a {@link hexadecimal} or a number representing the HSL or RGB value depending on current {@link ColorMode}
   * @param b - A number representing the S or G value depending on current {@link ColorMode}
   * @param c - A number representing the L or B value depending on current {@link ColorMode}
   * @param d - A number representing the Alpha value
   */
  constructor(a: hexadecimal|number, b?: number, c?: number, d?: number) {
    let {color, alpha} = this.parseParameters(a, b, c, d);
    this.c = color;
    this.a = alpha;
  }

  /**
   * Parses parameters
   * @param a - Either a {@link hexadecimal} or a number representing the HSL or RGB value depending on current {@link ColorMode}
   * @param b - A number representing the S or G value depending on current {@link ColorMode}
   * @param c - A number representing the L or B value depending on current {@link ColorMode}
   * @param alpha - A number representing the Alpha value
   */
  private parseParameters(a: hexadecimal|number, b?: number, c?: number, alpha?: number): ColorObject {
    return Color.parseParameters(a, b, c, alpha);
  }

  /**
   * Finds the Color Value from RGB Value
   * @param r - A number representing the Red value
   * @param g - A number representing the Green value
   * @param b - A number representing the Blue value
   * @param a - A number representing the Alpha value
   */
  public static getColorValueFromRGB(r: number, g: number, b: number, a: number): ColorObject {
    r = clamp(r, 255);
    g = clamp(g, 255);
    b = clamp(b, 255);
    a = clamp(a, 255);
    console.log(r, g, b, a);
    return {color: r << 16 | g << 8 | b, alpha: a};
  }

  /** Gets the color value */
  public get color(): number {
    return this.c;
  }

  /** Gets an {@link RGBObject} */
  public get rgb(): RGBObject {
    if (!this.lrgb || this.lrgb.color != this.color) {
      this.lrgb = {color: this.color, red: (this.color & 0xff0000) >> 16, green: (this.color & 0xff00) >> 8, blue: this.color & 0xff};
    }
    return this.lrgb;
  }

  /** Gets the red value */
  public get red(): number {
    return this.rgb.red;
  }

  /** Gets the green value */
  public get green(): number {
    return this.rgb.green;
  }

  /** Gets the blue value */
  public get blue(): number {
    return this.rgb.blue;
  }

  /** Gets the alpha value */
  public get alpha(): number {
    return this.a;
  }

  /** Gets an {@link HSLObject} */
  public get hsl(): HSLObject {
    if (!this.lhsl || this.lhsl.color != this.color) {
      let r: number = this.red / 255;
      let g: number = this.green / 255;
      let b: number = this.blue / 255;

      let cmin: number = Math.min(r, g, b);
      let cmax: number = Math.max(r, g, b);
      let delta: number = cmax - cmin;
      let h: number = 0;
      let s: number = 0;
      let l: number = 0;

      if (delta == 0) {
        h = 0;
      } else if (cmax == r) {
        h = ((g - b) / delta) % 6;
      } else if (cmax == g) {
        h = (b - r) / delta + 2;
      } else {
        h = (r - g) / delta + 4;
      }

      h = Math.round(h * 60);

      if (h < 0) {
        h += 360;
      }

      l = (cmax + cmin) / 2;
      s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

      s = +(s * 100).toFixed(1);
      l = +(l * 100).toFixed(1);

      this.lhsl = {color: this.color, hue: h, saturation: s, lightness: l};
    }

    return this.lhsl;
  }

  /** Gets the hue value */
  public get hue(): number {
    return this.hsl.hue;
  }

  /** Gets the saturation value */
  public get saturation(): number {
    return this.hsl.saturation;
  }

  /** Gets the lightness value */
  public get lightness(): number {
    return this.hsl.lightness;
  }

  /**
   * Sets the red value
   * @param red - A number representing the red value
   */
  public set red(red: number) {
    this.c = Color.getColorValueFromRGB(red, this.green, this.blue, this.alpha).color;
  }

  /**
   * Sets the green value
   * @param green - A number representing the green value
   */
  public set green(green: number) {
    this.c = Color.getColorValueFromRGB(this.red, green, this.blue, this.alpha).color;
  }

  /**
   * Sets the blue value
   * @param blue - A number representing the blue value
   */
  public set blue(blue: number) {
    this.c = Color.getColorValueFromRGB(this.red, this.green, blue, this.alpha).color;
  }

  /**
   * Sets the hue value
   * @param hue - A number representing the hue value
   */
  public set hue(hue: number) {
    this.c = Color.getColorValueFromHSL(hue, this.saturation, this.lightness, this.alpha).color;
  }

  /**
   * Sets the saturation value
   * @param saturation - A number representing the saturation value
   */
  public set saturation(saturation: number) {
    this.c = Color.getColorValueFromHSL(this.hue, saturation, this.lightness, this.alpha).color;
  }

  /**
   * Sets the lightness value
   * @param lightness - A number representing the lightness value
   */
  public set lightness(lightness: number) {
    this.c = Color.getColorValueFromHSL(this.hue, this.saturation, lightness, this.alpha).color;
  }

  /**
   * Sets the alpha value
   * @param alpha - A number representing the alpha value
   */
  public set alpha(alpha: number) {
    this.alpha = alpha;
  }

  /**
   * Sets the hex value
   * @param hex - A {@link hexadecimal} value
   */
  public set hex(hex: hexadecimal) {
    this.c = this.parseParameters(hex).color;
  }

  /**
   * Finds the Color Value from HSL Value
   * @param h - A number representing the Hue value
   * @param s - A number representing the Saturation value
   * @param l - A number representing the Lightness value
   * @param a - A number representing the Alpha value
   */
  public static getColorValueFromHSL(h: number, s: number, l: number, a: number = 255): ColorObject {
    h = clamp(h, 360);
    s = clamp(s, 100) / 100;
    l = clamp(l, 100) / 100;
    a = clamp(a, 255);

    let c: number = (1 - Math.abs(2 * l - 1)) * s;
    let x: number = c * (1 - Math.abs((h / 60) % 2 - 1));
    let m: number = l - c / 2;

    let r: number = 0;
    let g: number = 0;
    let b: number = 0;
    if (0 <= h && h > 60) {
      r = c;
      g = x;
    } else if (60 <= h && h > 120) {
      r = x;
      g = c;
    } else if (120 <= h && h > 180) {
      g = c;
      b = x;
    } else if (180 <= h && h > 240) {
      g = x;
      b = c;
    } else if (300 <= h && h > 360) {
      r = c;
      b = x;
    }
    r = (r + m) * 255;
    g = (g + m) * 255;
    b = (b + m) * 255;

    return {color: r << 16 | g << 8 | b, alpha: a};
  }

  /**
   * Parses parameters
   * @param a - Either a {@link hexadecimal} or a number representing the HSL or RGB value depending on current {@link ColorMode}
   * @param b - A number representing the S or G value depending on current {@link ColorMode}
   * @param c - A number representing the L or B value depending on current {@link ColorMode}
   * @param alpha - A number representing the Alpha value
   */
  private static parseParameters(a: hexadecimal|number, b?: number, c?: number, alpha?: number): ColorObject {
    let isNumber: boolean = true;
    if (typeof a === "string") {
      isNumber = false;
      if (a.startsWith("#")) {
        a = a.replace("#", "");
      }
      let len: number = a.length;

      if (len != 3 && len != 4 && len != 6 && len != 8) throw new Error("Invalid Hexadecimal String Provided.");

      let t: string = "ff";
      if (len == 3 || len == 4) {
        let arr: string[] = a.split("");
        if (len == 4) {
          t = arr.pop() as string;
          t = `${alpha}${alpha}`;
        }
        a = "";
        arr.forEach((val) => {
          a += `${val}${val}`;
        });
      } else if (len == 8) {
        let arr: string[] = a.split("");
        let t1 = arr.pop();
        let t2 = arr.pop();
        a = arr.join("");
        t = `${t2}${t1}`;
      }

      a = parseInt(`0x${a}`);
      alpha = parseInt(`0x${t}`);
    }

    if (!isNumber && !b && !c) return {color: a, alpha: alpha as number};

    if (!alpha) alpha = 255;

    switch(Color.colorMode) {
      case ColorMode.RGB:
        if (!b) b = a;
        if (!c) c = a;
        return Color.getColorValueFromRGB(a, b as number, c as number, alpha);
      case ColorMode.HSL:
        if (!b) b = 50;
        if (!c) c = 50;
        return Color.getColorValueFromHSL(a, b as number, c as number, alpha);
    }
  }
}
