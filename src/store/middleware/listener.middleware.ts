import { createListenerMiddleware, addListener } from '@reduxjs/toolkit';
import type { TypedStartListening, TypedAddListener } from '@reduxjs/toolkit';

import type { RootState, AppDispatch } from '../index';

import { DIRECTION_VALUES } from '../../models/directions';
import { IField } from '../../models/field.interface';
import { ISnake, ISnakeSegment } from '../../models/snake.interface';
import { getField, getNewApple } from '../../shared/utils';
import { FIELD_SIZE, GAME_SPEED, SQUARE_VALUES } from '../../shared/variables';
import {
  increaseScore,
  move,
  restart,
  setApple,
  setField,
  setIntervalId,
  setPrevMoveDirection,
  setSnake,
  start,
  stop,
  toggleGame,
} from '../gameSlice';
import { IAppleSquare } from '../../models/apple.interface';

export const listenerMiddleware = createListenerMiddleware();

export type AppStartListening = TypedStartListening<RootState, AppDispatch>;

export const startAppListening = listenerMiddleware.startListening as AppStartListening;

export const addAppListener = addListener as TypedAddListener<RootState, AppDispatch>;

startAppListening({
  actionCreator: toggleGame,
  effect: (action, listenerApi): void => {
    const {
      game: { intervalId },
    } = listenerApi.getState();

    if (intervalId) {
      listenerApi.dispatch(stop());
      return;
    }

    listenerApi.dispatch(start());
  },
});

startAppListening({
  actionCreator: start,
  effect: (action, listenerApi): void => {
    const intervalId: number = window.setInterval(() => {
      listenerApi.dispatch(move());
    }, GAME_SPEED);

    listenerApi.dispatch(setIntervalId(intervalId));
  },
});

startAppListening({
  actionCreator: move,
  effect: (action, listenerApi): void => {
    const {
      game: { field, snake, direction, apple },
    } = listenerApi.getState();

    listenerApi.dispatch(setPrevMoveDirection(direction));
    const snakeBodyAfterMove: ISnakeSegment[] = [...snake.body];
    let segmentstoGrowAfterMove: number = snake.segmentsToGrow;
    const snakeLength: number = snake.body.length;
    const snakeHead: ISnakeSegment = snake.body[snakeLength - 1];
    let headX: number = snakeHead.x;
    let headY: number = snakeHead.y;

    switch (direction) {
      case DIRECTION_VALUES.UP:
        headY = snakeHead.y - 1 < 0 ? FIELD_SIZE - 1 : snakeHead.y - 1;
        break;
      case DIRECTION_VALUES.RIGHT:
        headX = snakeHead.x + 1 === FIELD_SIZE ? 0 : snakeHead.x + 1;
        break;
      case DIRECTION_VALUES.DOWN:
        headY = snakeHead.y + 1 === FIELD_SIZE ? 0 : snakeHead.y + 1;
        break;
      case DIRECTION_VALUES.LEFT:
        headX = snakeHead.x - 1 < 0 ? FIELD_SIZE - 1 : snakeHead.x - 1;
        break;
    }

    if (field[headY][headX].value === SQUARE_VALUES.SNAKE) {
      listenerApi.dispatch(stop());
      listenerApi.dispatch(restart());
      return;
    }

    const isAppleEaten: boolean = headX === apple.x && headY === apple.y;

    if (isAppleEaten) {
      segmentstoGrowAfterMove = snake.segmentsToGrow + 2;
    }

    if (snake.segmentsToGrow > 0) {
      segmentstoGrowAfterMove = snake.segmentsToGrow - 1;
    } else {
      snakeBodyAfterMove.shift();
    }

    snakeBodyAfterMove.push({ x: headX, y: headY });
    const snakeAfterMove: ISnake = { ...snake, body: snakeBodyAfterMove, segmentsToGrow: segmentstoGrowAfterMove };
    listenerApi.dispatch(setSnake(snakeAfterMove));

    let newApple: IAppleSquare = apple;

    if (isAppleEaten) {
      newApple = getNewApple(snakeAfterMove.body);
      listenerApi.dispatch(increaseScore());
      listenerApi.dispatch(setApple(newApple));
    }

    const updatedField: IField = getField(snakeAfterMove.body, newApple);
    listenerApi.dispatch(setField(updatedField));

    // Game success
    if (snakeAfterMove.body.length + segmentstoGrowAfterMove === FIELD_SIZE ** 2 - 1) {
      listenerApi.dispatch(stop());
    }
  },
});
