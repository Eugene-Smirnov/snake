export type FieldModel = RowModel[];

export type RowModel = SquareModel[];

export type SquareModel = {
  x: number;
  y: number;
  value: SquareValues;
};

type SquareValues = 'empty' | 'snake' | 'apple';
