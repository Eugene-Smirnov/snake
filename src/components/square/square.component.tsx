import React, { FC } from 'react';
import { SquareModel } from '../../models/field.model';
import './square.component.scss';

type SquareComponentProps = {
  square: SquareModel;
};

export const SquareComponent: FC<SquareComponentProps> = ({ square }: SquareComponentProps) => {
  return (
    <div className={`square__wrapper${square.value ? ' ' + square.value : ''}`}>
      <div className="square"></div>
    </div>
  );
};
