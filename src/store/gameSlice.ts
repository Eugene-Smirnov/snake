import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DIRECTION_VALUES, TDirection } from '../models/directions';
import { ISnake } from '../models/snake.interface';
import { IField } from '../models/field.interface';
import { getField, initSnakeBody } from '../shared/utils';
import { FIELD_SIZE, SQUARE_VALUES } from '../shared/variables';
import { IAppleSquare } from '../models/apple.interface';
import scoreService from '../services/score.service';

export interface GameSliceState {
  intervalId: number | null;
  direction: TDirection;
  prevMoveDirection: TDirection;
  snake: ISnake;
  apple: IAppleSquare;
  field: IField;
  score: number;
  bestScore: number;
}

const INITIAL_SNAKE: ISnake = {
  body: initSnakeBody(),
  segmentsToGrow: 0,
};

const INITIAL_APPLE: IAppleSquare = {
  x: FIELD_SIZE - 2,
  y: FIELD_SIZE - 2,
  value: SQUARE_VALUES.APPLE,
};

const SCORE_STEP = 100;

const GAME_INITIAL_STATE: GameSliceState = {
  intervalId: null,
  direction: DIRECTION_VALUES.RIGHT,
  prevMoveDirection: DIRECTION_VALUES.RIGHT,
  snake: {
    body: [...INITIAL_SNAKE.body],
    segmentsToGrow: INITIAL_SNAKE.segmentsToGrow,
  },
  apple: { ...INITIAL_APPLE },
  field: [...getField(initSnakeBody(), { ...INITIAL_APPLE })],
  score: 0,
  bestScore: scoreService.getBestPreviousScore(),
};

export const gameSlice = createSlice({
  name: 'game',
  initialState: GAME_INITIAL_STATE,
  reducers: {
    start: () => {},
    setIntervalId: (state, action: PayloadAction<number | null>) => {
      state.intervalId = action.payload;
    },
    stop: (state) => {
      if (state.intervalId) {
        window.clearInterval(state.intervalId);
      }

      state.intervalId = null;
    },
    toggleGame: () => {},
    restart: (state) => {
      state.intervalId = null;
      state.snake = {
        body: [...INITIAL_SNAKE.body],
        segmentsToGrow: INITIAL_SNAKE.segmentsToGrow,
      };
      state.direction = DIRECTION_VALUES.RIGHT;
      state.prevMoveDirection = DIRECTION_VALUES.RIGHT;
      state.apple = { ...INITIAL_APPLE };
      state.field = [...getField(initSnakeBody(), INITIAL_APPLE)];
      state.score = 0;
      state.bestScore = scoreService.getBestPreviousScore();
    },
    setField: (state, action: PayloadAction<IField>) => {
      state.field = action.payload;
    },
    setSnake: (state, action: PayloadAction<ISnake>) => {
      state.snake = action.payload;
    },
    setApple: (state, action: PayloadAction<IAppleSquare>) => {
      state.apple = action.payload;
    },
    move: () => {},
    up: (state) => {
      if (state.prevMoveDirection === DIRECTION_VALUES.UP || state.prevMoveDirection === DIRECTION_VALUES.DOWN) {
        return;
      }
      state.direction = DIRECTION_VALUES.UP;
    },
    right: (state) => {
      if (state.prevMoveDirection === DIRECTION_VALUES.RIGHT || state.prevMoveDirection === DIRECTION_VALUES.LEFT) {
        return;
      }
      state.direction = DIRECTION_VALUES.RIGHT;
    },
    down: (state) => {
      if (state.prevMoveDirection === DIRECTION_VALUES.DOWN || state.prevMoveDirection === DIRECTION_VALUES.UP) {
        return;
      }
      state.direction = DIRECTION_VALUES.DOWN;
    },
    left: (state) => {
      if (state.prevMoveDirection === DIRECTION_VALUES.LEFT || state.prevMoveDirection === DIRECTION_VALUES.RIGHT) {
        return;
      }
      state.direction = DIRECTION_VALUES.LEFT;
    },
    setPrevMoveDirection: (state, action: PayloadAction<TDirection>) => {
      state.prevMoveDirection = action.payload;
    },
    increaseScore: (state) => {
      state.score = state.score + SCORE_STEP;

      scoreService.updateBestScore(state.score);
      state.bestScore = scoreService.getBestPreviousScore();
    },
  },
});

export const {
  start,
  setIntervalId,
  stop,
  toggleGame,
  restart,
  setField,
  setSnake,
  setApple,
  move,
  up,
  right,
  down,
  left,
  setPrevMoveDirection,
  increaseScore,
} = gameSlice.actions;

export default gameSlice.reducer;
