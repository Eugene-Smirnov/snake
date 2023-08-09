export const GAME_SPEED = 500;
export const FIELD_SIZE = 20;
export const SNAKE_LENGTH = 5;

export const SQUARE_VALUES = {
  EMPTY: null,
  SNAKE: 'snake',
  APPLE: 'apple',
} as const;

type SquareValuesKeys = keyof typeof SQUARE_VALUES;
export type TSquareValues = typeof SQUARE_VALUES[SquareValuesKeys];
