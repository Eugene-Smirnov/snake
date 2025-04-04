import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { RowComponent } from '../row/row.component';
import './field.component.scss';
import { IField } from '../../models/field.interface';

// type FieldComponentProps = {};

export const FieldComponent: FC = () => {
  const field = useSelector<RootState, IField>(({ game: { field } }) => field);

  return (
    <div className="field__wrapper">
      <div className="field">
        {field.map((row, id) => {
          return <RowComponent key={`row` + id} row={row}></RowComponent>;
        })}
      </div>
    </div>
  );
};
