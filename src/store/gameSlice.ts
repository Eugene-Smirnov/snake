import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FIELD_SIZE } from '../components/field/field';
import Directions from '../models/directions';
import { Snake, SnakeModel } from '../models/snake.model';

export interface GameSliceState {
  intervalID: number | null;
  direction: Directions;
  snake: SnakeModel;
}

const GAME_INITIAL_STATE: GameSliceState = {
  intervalID: null,
  direction: 'right',
  snake: new Snake(),
};

export const gameSlice = createSlice({
  name: 'game',
  initialState: GAME_INITIAL_STATE,
  reducers: {
    setIntervalID: (state, action: PayloadAction<number>) => {
      state.intervalID = action.payload;
    },
    clearIntervalID: (state) => {
      state.intervalID = null;
    },
    move: (state) => {
      const snakeBody = state.snake.body;
      const snakeLength = snakeBody.length;
      const snakeHead = snakeBody[snakeLength - 1];
      let headX = snakeHead.x;
      let headY = snakeHead.y;
      switch (state.direction) {
        case 'up':
          headY = snakeHead.y - 1 < 0 ? FIELD_SIZE - 1 : snakeHead.y - 1;
          break;
        case 'right':
          headX = snakeHead.x + 1 === FIELD_SIZE ? 0 : snakeHead.x + 1;
          break;
        case 'down':
          headY = snakeHead.y + 1 === FIELD_SIZE ? 0 : snakeHead.y + 1;
          break;
        case 'left':
          headX = snakeHead.x - 1 < 0 ? FIELD_SIZE - 1 : snakeHead.x - 1;
          break;
      }

      if (state.snake.segmentsToGrow > 0) {
        state.snake.segmentsToGrow = state.snake.segmentsToGrow - 1;
      } else {
        snakeBody.shift();
      }

      snakeBody.push({ x: headX, y: headY });
    },
    up: (state) => {
      if (state.direction === 'up' || state.direction === 'down') {
        return;
      }
      state.direction = 'up';
    },
    right: (state) => {
      if (state.direction === 'right' || state.direction === 'left') {
        return;
      }
      state.direction = 'right';
    },
    down: (state) => {
      if (state.direction === 'down' || state.direction === 'up') {
        return;
      }
      state.direction = 'down';
    },
    left: (state) => {
      if (state.direction === 'left' || state.direction === 'right') {
        return;
      }
      state.direction = 'left';
    },
  },
});

export const { setIntervalID, clearIntervalID, move, up, right, down, left } = gameSlice.actions;

export default gameSlice.reducer;
