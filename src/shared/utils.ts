import { IAppleSquare } from '../models/apple.interface';
import { IField, IRow } from '../models/field.interface';
import { ISnakeSegment } from '../models/snake.interface';
import { FIELD_SIZE, SNAKE_LENGTH, SQUARE_VALUES } from './variables';

export function initSnakeBody(): ISnakeSegment[] {
  const body: ISnakeSegment[] = [];
  for (let i = 0; i < SNAKE_LENGTH; i++) {
    body.push({ x: i, y: 0 });
  }
  return body;
}

export function getField(snakeBody: ISnakeSegment[], apple: IAppleSquare): IField {
  const rawMatrix: IField = [];
  for (let i = 0; i < FIELD_SIZE; i++) {
    const row: IRow = [];
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

export function getNewApple(snakeBody: ISnakeSegment[]): IAppleSquare {
  let appleX: number = generateRandomNumber(FIELD_SIZE);
  let appleY: number = generateRandomNumber(FIELD_SIZE);

  while (snakeBody.some(({ x: snakeX, y: snakeY }) => snakeX === appleX && snakeY === appleY)) {
    appleX = generateRandomNumber(FIELD_SIZE);
    appleY = generateRandomNumber(FIELD_SIZE);
  }

  return {
    value: SQUARE_VALUES.APPLE,
    x: appleX,
    y: appleY,
  };
}
