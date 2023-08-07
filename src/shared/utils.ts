import { AppleSquareModel, FieldModel, RowModel, SQUARE_VALUES } from '../models/field.model';
import { SnakeSegment } from '../models/snake.model';
import { FIELD_SIZE } from './variables';

export function getField(snakeBody: SnakeSegment[], apple: AppleSquareModel): FieldModel {
  const rawMatrix: FieldModel = [];
  for (let i = 0; i < FIELD_SIZE; i++) {
    const row: RowModel = [];
    for (let j = 0; j < FIELD_SIZE; j++) {
      row.push({
        y: i,
        x: j,
        value: SQUARE_VALUES.EMPTY,
      });
    }
    rawMatrix.push(row);
  }

  snakeBody.forEach((segment) => {
    rawMatrix[segment.y][segment.x].value = SQUARE_VALUES.SNAKE;
  });

  rawMatrix[apple.y][apple.x].value = SQUARE_VALUES.APPLE;

  return rawMatrix;
}

export function generateRandomNumber(max: number): number {
  return Math.floor(Math.random() * max);
}
