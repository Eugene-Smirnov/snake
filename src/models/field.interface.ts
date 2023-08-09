import { TSquareValues } from '../shared/variables';

export type IField = IRow[];

export type IRow = ISquare[];

export interface ISquare {
  x: number;
  y: number;
  value: TSquareValues;
}
