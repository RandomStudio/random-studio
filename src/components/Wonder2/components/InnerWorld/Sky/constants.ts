import { Color } from 'three';

export const DAY_NIGHT_CYCLE_STAGE = {
  DEEP_NIGHT: 'Deep Night (Astronomical Night)',
  ASTRONOMICAL_TWILIGHT: 'Astronomical Twilight',
  NAUTICAL_TWILIGHT: 'Nautical Twilight',
  CIVIL_TWILIGHT: 'Civil Twilight',
  SUNRISE: 'Sunrise',
  SUNSET: 'Sunset',
  EARLY_MORNING: 'EARLY_MORNING',
  MID_MORNING: 'MID_MORNING',
  LATE_MORNING: 'LATE_MORNING',
  NOON: 'NOON',
} as const;

export const DAY_NIGHT_CYCLE_STAGES = [
  {
    elevation: -90,
    name: DAY_NIGHT_CYCLE_STAGE.DEEP_NIGHT,
    lightColor: new Color(0x181818),
    intensity: 0.05,
    turbidity: 2,
    rayleigh: 0.2,
    mieCoefficient: 0.005,
    topSkyColor: new Color(0x16181b),
    bottomSkyColor: new Color(0x293d5a),

    normalizedElevation: 0.0,
  },
  {
    elevation: -12,
    name: DAY_NIGHT_CYCLE_STAGE.ASTRONOMICAL_TWILIGHT,
    lightColor: new Color(0x483d8b),
    intensity: 0.1,
    turbidity: 6,
    rayleigh: 0.5,
    mieCoefficient: 0.0008,
    topSkyColor: new Color(0xb3c1c9),
    bottomSkyColor: new Color(0xf8dab0),
    normalizedElevation: 0.4333,
  },
  {
    elevation: -6,
    name: DAY_NIGHT_CYCLE_STAGE.NAUTICAL_TWILIGHT,
    lightColor: new Color(0x6495ed),
    intensity: 0.3,
    turbidity: 10,
    rayleigh: 1,
    mieCoefficient: 0.001,
    topSkyColor: new Color(0xf5f8fa),
    bottomSkyColor: new Color(0xafd0f8),
    normalizedElevation: 0.4667,
  },
  {
    elevation: -0.3,
    name: DAY_NIGHT_CYCLE_STAGE.CIVIL_TWILIGHT,
    lightColor: new Color(0xffdab9),
    intensity: 0.5,
    turbidity: 20,
    rayleigh: 2,
    mieCoefficient: 0.002,
    topSkyColor: new Color(0xb9c8de),
    bottomSkyColor: new Color(0x98aec4),
    normalizedElevation: 0.4983,
  },
  {
    elevation: 0,
    name: DAY_NIGHT_CYCLE_STAGE.SUNRISE,
    lightColor: new Color(0xffa07a),
    intensity: 0.8,
    turbidity: 10,
    rayleigh: 3,
    mieCoefficient: 0.005,
    topSkyColor: new Color(0xd7c9e3),
    bottomSkyColor: new Color(0xffca7f),
    normalizedElevation: 0.5,
  },
  {
    elevation: 0.1,
    name: DAY_NIGHT_CYCLE_STAGE.EARLY_MORNING,
    lightColor: new Color(0xffa07a),
    intensity: 0.8,
    turbidity: 10,
    rayleigh: 3,
    mieCoefficient: 0.005,
    topSkyColor: new Color(0xd7c9e3),
    bottomSkyColor: new Color(0xffca7f),
    normalizedElevation: 0.5006,
  },
  {
    elevation: 5,
    name: DAY_NIGHT_CYCLE_STAGE.MID_MORNING,
    lightColor: new Color(0xffdab9),
    intensity: 0.9,
    turbidity: 8,
    rayleigh: 3,
    mieCoefficient: 0.005,
    topSkyColor: new Color(0xf5f8fa),
    bottomSkyColor: new Color(0xafd0f8),
    normalizedElevation: 0.5278,
  },
  {
    elevation: 15,
    name: DAY_NIGHT_CYCLE_STAGE.LATE_MORNING,
    lightColor: new Color(0xffffe0),
    intensity: 0.95,
    turbidity: 6,
    rayleigh: 2,
    mieCoefficient: 0.005,
    topSkyColor: new Color(0xf5f8fa),
    bottomSkyColor: new Color(0xafd0f8),
    normalizedElevation: 0.5833,
  },
  {
    elevation: 90,
    name: DAY_NIGHT_CYCLE_STAGE.NOON,
    lightColor: new Color(0xf0ffff),
    intensity: 1.0,
    turbidity: 5,
    rayleigh: 1,
    mieCoefficient: 0.005,
    topSkyColor: new Color(0xf5f8fa),
    bottomSkyColor: new Color(0xafd0f8),
    normalizedElevation: 1.0,
  },
  {
    elevation: 0.3,
    name: DAY_NIGHT_CYCLE_STAGE.SUNSET,
    lightColor: new Color(0xffa07a),
    intensity: 0.8,
    turbidity: 10,
    rayleigh: 10,
    mieCoefficient: 0.005,
    topSkyColor: new Color(0xd7c9e3),
    bottomSkyColor: new Color(0xffca7f),
    normalizedElevation: 1.4984,
  },
  {
    elevation: -6,
    name: DAY_NIGHT_CYCLE_STAGE.CIVIL_TWILIGHT,
    lightColor: new Color(0xffdab9),
    intensity: 0.5,
    turbidity: 20,
    rayleigh: 2,
    mieCoefficient: 0.002,
    topSkyColor: new Color(0xb9c8de),
    bottomSkyColor: new Color(0x98aec4),
    normalizedElevation: 1.5333,
  },
  {
    elevation: -12,
    name: DAY_NIGHT_CYCLE_STAGE.NAUTICAL_TWILIGHT,
    lightColor: new Color(0x6495ed),
    intensity: 0.3,
    turbidity: 10,
    rayleigh: 1,
    mieCoefficient: 0.001,
    topSkyColor: new Color(0xf5f8fa),
    bottomSkyColor: new Color(0xafd0f8),
    normalizedElevation: 1.56666,
  },
  {
    elevation: -18,
    name: DAY_NIGHT_CYCLE_STAGE.ASTRONOMICAL_TWILIGHT,
    lightColor: new Color(0x483d8b),
    intensity: 0.1,
    turbidity: 6,
    rayleigh: 0.5,
    mieCoefficient: 0.0008,
    topSkyColor: new Color(0x8284b9),
    bottomSkyColor: new Color(0x8896c9),
    normalizedElevation: 1.6,
  },
] as const;