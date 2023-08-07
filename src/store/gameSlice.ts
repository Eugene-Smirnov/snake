import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DIRECTION_VALUES, TDirection } from '../models/directions';
import { Snake, SnakeModel } from '../models/snake.model';
import { AppleSquareModel, FieldModel, SQUARE_VALUES } from '../models/field.model';
import { getField } from '../shared/utils';
import { FIELD_SIZE } from '../shared/variables';

export interface GameSliceState {
  intervalID: number | null;
  direction: TDirection;
  snake: SnakeModel;
  apple: AppleSquareModel;
  field: FieldModel;
}

const INITIAL_SNAKE = new Snake();
const INITIAL_APPLE: AppleSquareModel = {
  x: FIELD_SIZE - 2,
  y: FIELD_SIZE - 2,
  value: SQUARE_VALUES.APPLE,
};
const INITIAL_FIELD = getField(INITIAL_SNAKE.body, INITIAL_APPLE);

const GAME_INITIAL_STATE: GameSliceState = {
  intervalID: null,
  direction: DIRECTION_VALUES.RIGHT,
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
    setField: (state, action: PayloadAction<FieldModel>) => {
      state.field = action.payload;
    },
    setSnake: (state, action: PayloadAction<SnakeModel>) => {
      state.snake = action.payload;
    },
    move: () => {},
    up: (state) => {
      if (state.direction === DIRECTION_VALUES.UP || state.direction === DIRECTION_VALUES.DOWN) {
        return;
      }
      state.direction = DIRECTION_VALUES.UP;
    },
    right: (state) => {
      if (state.direction === DIRECTION_VALUES.RIGHT || state.direction === DIRECTION_VALUES.LEFT) {
        return;
      }
      state.direction = DIRECTION_VALUES.RIGHT;
    },
    down: (state) => {
      if (state.direction === DIRECTION_VALUES.DOWN || state.direction === DIRECTION_VALUES.UP) {
        return;
      }
      state.direction = DIRECTION_VALUES.DOWN;
    },
    left: (state) => {
      if (state.direction === DIRECTION_VALUES.LEFT || state.direction === DIRECTION_VALUES.RIGHT) {
        return;
      }
      state.direction = DIRECTION_VALUES.LEFT;
    },
  },
});

export const { start, setIntervalID, stop, toggleGame, setField, setSnake, move, up, right, down, left } =
  gameSlice.actions;

export default gameSlice.reducer;
