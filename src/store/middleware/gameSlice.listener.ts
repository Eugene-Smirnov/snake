// import { DIRECTION_VALUES } from '../../models/directions';
// import { FieldModel } from '../../models/field.model';
// import { Snake, SnakeModel, SnakeSegment } from '../../models/snake.model';
// import { getField } from '../../shared/utils';
// import { FIELD_SIZE } from '../../shared/variables';
// import { move, setField, setIntervalID, setSnake, start, stop, toggleGame } from '../gameSlice';
// import { startAppListening } from './listener.middleware';

// startAppListening({
//   actionCreator: toggleGame,
//   effect: (action, listenerApi): void => {
//     const {
//       game: { intervalID },
//     } = listenerApi.getState();

//     if (intervalID) {
//       listenerApi.dispatch(stop());
//       return;
//     }

//     listenerApi.dispatch(start());
//   },
// });

// startAppListening({
//   actionCreator: start,
//   effect: (action, listenerApi): void => {
//     const intervalID: number = window.setInterval(() => {
//       listenerApi.dispatch(move());
//     });

//     listenerApi.dispatch(setIntervalID(intervalID));
//   },
// });

// startAppListening({
//   actionCreator: move,
//   effect: (action, listenerApi): void => {
//     const {
//       game: {
//         snake: { body: snakeBody, segmentsToGrow },
//         direction,
//         apple,
//       },
//     } = listenerApi.getState();

//     const snakeBodyAfterMove: SnakeSegment[] = [...snakeBody];
//     let segmentstoGrowAfterMove: number = segmentsToGrow;
//     const snakeLength: number = snakeBody.length;
//     const snakeHead: SnakeSegment = snakeBody[snakeLength - 1];
//     let headX: number = snakeHead.x;
//     let headY: number = snakeHead.y;

//     switch (direction) {
//       case DIRECTION_VALUES.UP:
//         headY = snakeHead.y - 1 < 0 ? FIELD_SIZE - 1 : snakeHead.y - 1;
//         break;
//       case DIRECTION_VALUES.RIGHT:
//         headX = snakeHead.x + 1 === FIELD_SIZE ? 0 : snakeHead.x + 1;
//         break;
//       case DIRECTION_VALUES.DOWN:
//         headY = snakeHead.y + 1 === FIELD_SIZE ? 0 : snakeHead.y + 1;
//         break;
//       case DIRECTION_VALUES.LEFT:
//         headX = snakeHead.x - 1 < 0 ? FIELD_SIZE - 1 : snakeHead.x - 1;
//         break;
//     }

//     if (segmentsToGrow > 0) {
//       segmentstoGrowAfterMove = segmentsToGrow - 1;
//     } else {
//       snakeBodyAfterMove.shift();
//     }

//     snakeBodyAfterMove.push({ x: headX, y: headY });

//     const snakeAfterMove: SnakeModel = new Snake(snakeBodyAfterMove, segmentstoGrowAfterMove);

//     const field: FieldModel = getField(snakeAfterMove.body, apple);

//     listenerApi.dispatch(setSnake(snakeAfterMove));
//     listenerApi.dispatch(setField(field));
//   },
// });
