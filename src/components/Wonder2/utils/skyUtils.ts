import { DAY_NIGHT_CYCLE_STAGES } from '../components/InnerWorld/Sky/constants';

export const simulateSunPosition = (elapsedSeconds: number) => {
  // Convert elapsedSeconds to equivalent hours in the day-night cycle
  const hours = (elapsedSeconds % 10) * 2.4;

  // Simplify by using a sinusoidal function to simulate the sun's elevation
  // This ranges from 0 to 180 degrees over the course of a day, but we'll shift and scale it
  // to go from -90 (sunrise) to 90 (sunset) degrees
  const elevation = 90 * Math.sin((hours / 24) * Math.PI * 2 - Math.PI / 2);

  // Calculate azimuth to rotate 360 degrees across the 10-second cycle
  const azimuth = ((360 * (elapsedSeconds % 10)) / 10) % 360;

  return {
    elevation,
    azimuth,
  };
};

export const findStages = (elevation: number, azimuth: number) => {
  let normalizedElevation = (elevation + 90) / 180;

  if (azimuth > 180) {
    normalizedElevation = 1 + (1 - normalizedElevation);
  }

  const currentStageIndex = DAY_NIGHT_CYCLE_STAGES.findIndex(
    (stage, index, array) =>
      normalizedElevation >= stage.normalizedElevation &&
      (index === array.length - 1
        ? normalizedElevation < 2
        : normalizedElevation < array[index + 1].normalizedElevation),
  );

  // Handle wrapping and next stage logic
  const nextStageIndex =
    currentStageIndex === DAY_NIGHT_CYCLE_STAGES.length - 1
      ? 0
      : currentStageIndex + 1;

  return {
    currentStage: DAY_NIGHT_CYCLE_STAGES[currentStageIndex],
    nextStage: DAY_NIGHT_CYCLE_STAGES[nextStageIndex],
  };
};
