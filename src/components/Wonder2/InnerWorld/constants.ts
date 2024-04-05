export const DAY_NIGHT_CYCLE_STAGE = {
  DEEP_NIGHT: 'Deep Night (Astronomical Night)',
  ASTRONOMICAL_TWILIGHT: 'Astronomical Twilight',
  NAUTICAL_TWILIGHT: 'Nautical Twilight',
  CIVIL_TWILIGHT: 'Civil Twilight',
  SUNRISE_SUNSET: 'Sunrise / Sunset',
  DAYTIME: 'Daytime (Solar Day)',
} as const;

export type DayNightCycleStage =
  (typeof DAY_NIGHT_CYCLE_STAGE)[keyof typeof DAY_NIGHT_CYCLE_STAGE];

export const DAY_NIGHT_CYCLE_STAGES: Record<
  DayNightCycleStage,
  [number, number]
> = {
  [DAY_NIGHT_CYCLE_STAGE.DEEP_NIGHT]: [-90, -18],
  [DAY_NIGHT_CYCLE_STAGE.ASTRONOMICAL_TWILIGHT]: [-18, -12],
  [DAY_NIGHT_CYCLE_STAGE.NAUTICAL_TWILIGHT]: [-12, -6],
  [DAY_NIGHT_CYCLE_STAGE.CIVIL_TWILIGHT]: [-6, 0],
  [DAY_NIGHT_CYCLE_STAGE.SUNRISE_SUNSET]: [0, 0],
  [DAY_NIGHT_CYCLE_STAGE.DAYTIME]: [0, 90],
};
