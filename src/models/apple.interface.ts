import { ISquare as ISquare } from './field.interface';

export interface IAppleSquare extends ISquare {
  x: number;
  y: number;
  value: 'apple';
}
