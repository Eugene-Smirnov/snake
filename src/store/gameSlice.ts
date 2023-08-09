import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DIRECTION_VALUES, TDirection } from '../models/directions';
import { ISnake } from '../models/snake.interface';
import { IField } from '../models/field.interface';
import { getField, initSnakeBody } from '../shared/utils';
import { FIELD_SIZE, SQUARE_VALUES } from '../shared/variables';
import { IAppleSquare } from '../models/apple.interface';

export interface GameSliceState {
  intervalID: number | null;
  direction: TDirection;
  prevMoveDirection: TDirection;
  snake: ISnake;
  apple: IAppleSquare;
  field: IField;
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
const INITIAL_FIELD = getField(INITIAL_SNAKE.body, INITIAL_APPLE);

const GAME_INITIAL_STATE: GameSliceState = {
  intervalID: null,
  direction: DIRECTION_VALUES.RIGHT,
  prevMoveDirection: DIRECTION_VALUES.RIGHT,
  snake: INITIAL_SNAKE,
  apple: INITIAL_APPLE,
  field: INITIAL_FIELD,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState: GAME_INITIAL_STATE,
  reducers: {
    start: () => {},
    setIntervalID: (state, action: PayloadAction<number | null>) => {
      state.intervalID = action.payload;
    },
    stop: (state) => {
      if (state.intervalID) {
        window.clearInterval(state.intervalID);
      }

      state.intervalID = null;
    },
    toggleGame: () => {},
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
  },
});

export const {
  start,
  setIntervalID,
  stop,
  toggleGame,
  setField,
  setSnake,
  setApple,
  move,
  up,
  right,
  down,
  left,
  setPrevMoveDirection,
} = gameSlice.actions;

export default gameSlice.reducer;
