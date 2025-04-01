export const DIRECTION_VALUES = {
  UP: 'up',
  DOWN: 'down',
  LEFT: 'left',
  RIGHT: 'right',
} as const;

type directionValuesKeys = keyof typeof DIRECTION_VALUES;
export type TDirection = (typeof DIRECTION_VALUES)[directionValuesKeys];
