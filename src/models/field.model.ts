export type FieldModel = RowModel[];

export type RowModel = SquareModel[];

export interface SquareModel {
  x: number;
  y: number;
  value: SquareValues;
}

export interface AppleSquareModel extends SquareModel {
  x: number;
  y: number;
  value: 'apple';
}

export const SQUARE_VALUES = {
  EMPTY: null,
  SNAKE: 'snake',
  APPLE: 'apple',
} as const;

type SquareValuesKeys = keyof typeof SQUARE_VALUES;
type SquareValues = typeof SQUARE_VALUES[SquareValuesKeys];
