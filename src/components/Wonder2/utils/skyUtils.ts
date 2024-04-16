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

export const findStages = (elevation: number) => {
  const sortedStages = [...DAY_NIGHT_CYCLE_STAGES].sort(
    (a, b) => a.elevation - b.elevation,
  );

  let currentStageIndex =
    sortedStages.findIndex(stage => stage.elevation >= elevation) - 1;

  currentStageIndex = Math.max(currentStageIndex, 0);

  if (
    currentStageIndex === -1 ||
    elevation > sortedStages[sortedStages.length - 1].elevation
  ) {
    currentStageIndex = sortedStages.length - 1;
  }

  const currentStage = sortedStages[currentStageIndex];

  const nextStageIndex = Math.min(
    currentStageIndex + 1,
    sortedStages.length - 1,
  );

  const nextStage = sortedStages[nextStageIndex];

  return {
    currentStage,
    nextStage,
  };
};
