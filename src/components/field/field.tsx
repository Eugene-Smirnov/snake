import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FieldModel, RowModel } from '../../models/Field.model';
import { SnakeSegment } from '../../models/snake.model';
import gameService from '../../services/game.service';
import { RootState } from '../../store';
import { move, setIntervalID } from '../../store/gameSlice';
import { Row } from '../row/row';
import './field.scss';

export const FIELD_SIZE = 20;

export const Field: FC = () => {
  const dispatch = useDispatch();
  const [matrix, setMatrix] = useState<FieldModel>([]);
  const snakeBody = useSelector<RootState, SnakeSegment[]>(
    ({
      game: {
        snake: { body },
      },
    }) => body
  );
  const isStarted = useSelector<RootState, boolean>(({ game: { intervalID } }) => !!intervalID);

  const fillMatrix = (snakeBody: SnakeSegment[]) => {
    console.log('!!!!');
    const rawMatrix: FieldModel = [];
    for (let i = 0; i < FIELD_SIZE; i++) {
      const row: RowModel = [];
      for (let j = 0; j < FIELD_SIZE; j++) {
        row.push({
          y: i,
          x: j,
          value: 'empty',
        });
      }
      rawMatrix.push(row);
    }

    snakeBody.forEach((segment) => {
      rawMatrix[segment.y][segment.x].value = 'snake';
    });

    return rawMatrix;
  };

  if (!isStarted) {
    const intervalID = gameService.start(() => {
      setMatrix(() => fillMatrix(snakeBody));
      dispatch(move());
    });

    dispatch(setIntervalID(intervalID));
  }

  return (
    <div className="field__wrapper">
      <div className="field">
        {matrix.map((row, id) => {
          return <Row key={`row` + id} row={row}></Row>;
        })}
      </div>
    </div>
  );
};
