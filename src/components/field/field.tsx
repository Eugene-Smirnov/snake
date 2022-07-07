import React, { FC } from 'react';
import { FieldModel, RowModel } from '../../models/Field.model';
import { Row } from '../row/row';
import './field.scss';

const FIELD_SIZE = 20;

export const Field: FC = () => {
  const matrix: FieldModel = [];

  for (let i = 0; i < FIELD_SIZE; i++) {
    const row: RowModel = [];
    for (let j = 0; j < FIELD_SIZE; j++) {
      row.push({
        x: i,
        y: j,
      });
    }
    matrix.push(row);
  }

  return (
    <div className="field__wrapper">
      <div className="field">
        {matrix.map((row, id) => {
          return <Row key={'row' + id} row={row}></Row>;
        })}
      </div>
    </div>
  );
};
