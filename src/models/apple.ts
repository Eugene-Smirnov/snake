import { FIELD_SIZE, generateRandomNumber } from '../shared/utils';
import { AppleSquareModel, SQUARE_VALUES } from './field.model';
import { SnakeModel } from './snake.model';

export class Apple implements AppleSquareModel {
  x: number;
  y: number;
  value = SQUARE_VALUES.APPLE;

  constructor({ body }: SnakeModel) {
    let appleX: number = generateRandomNumber(FIELD_SIZE);
    let appleY: number = generateRandomNumber(FIELD_SIZE);

    while (body.some(({ x: snakeX }) => snakeX === appleX)) {
      appleX = generateRandomNumber(FIELD_SIZE);
    }

    while (body.some(({ y: snakeY }) => snakeY === appleY)) {
      appleY = generateRandomNumber(FIELD_SIZE);
    }

    this.x = appleX;
    this.y = appleY;
  }
}
