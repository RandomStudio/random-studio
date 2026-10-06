const GRID_COLUMN_COUNT = 20;

export const getColumnSpanSizes = (columnSpan: number) =>
  `${Math.round((columnSpan / GRID_COLUMN_COUNT) * 100)}vw`;
