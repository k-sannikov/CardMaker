import { RGB } from "../store/types";

// конвертирование hex в rgb
export function convertColor(color: string): RGB {
  if (color.substring(0, 1) === "#") {
    color = color.substring(1);
  }
  const rgbColor: RGB = {
    r: 255,
    g: 255,
    b: 255,
  };
  rgbColor.r = parseInt(color.substring(0, 2), 16);
  rgbColor.g = parseInt(color.substring(2, 4), 16);
  rgbColor.b = parseInt(color.substring(4), 16);
  return rgbColor;
}