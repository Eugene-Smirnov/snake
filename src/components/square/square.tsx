import React, { FC } from 'react';
import { SquareModel } from '../../models/Field.model';
import './square.scss';

type SquareProps = {
  square: SquareModel;
};

export const Square: FC<SquareProps> = ({ square }: SquareProps) => {
  return (
    <div className={`square__wrapper${square.value === 'empty' ? '' : ' ' + square.value}`}>
      <div className="square"></div>
    </div>
  );
};
