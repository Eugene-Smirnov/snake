import React, { FC } from 'react';
import { ISquare } from '../../models/field.interface';
import './square.component.scss';

type SquareComponentProps = {
  square: ISquare;
};

export const SquareComponent: FC<SquareComponentProps> = ({ square }: SquareComponentProps) => {
  return (
    <div className={`square__wrapper${square.value ? ' ' + square.value : ''}`}>
      <div className="square"></div>
    </div>
  );
};
