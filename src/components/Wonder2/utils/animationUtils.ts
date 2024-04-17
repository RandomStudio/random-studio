import { Color } from 'three';

// Linear interpolation function for numbers
export const lerp = (start: number, end: number, alpha: number): number =>
  start * (1 - alpha) + end * alpha;

// Helper function for smoothly interpolating Color objects
export const lerpColor = (
  colorStart: Color,
  colorEnd: Color,
  alpha: number,
): Color => new Color().lerpColors(colorStart, colorEnd, alpha);
