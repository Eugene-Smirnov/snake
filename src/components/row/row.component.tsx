import React, { FC } from 'react';
import { RowModel } from '../../models/field.model';
import { SquareComponent } from '../square/square.component';
import './row.component.scss';

type RowComponentProps = {
  row: RowModel;
};

export const RowComponent: FC<RowComponentProps> = ({ row }: RowComponentProps) => {
  return (
    <div className="row">
      {row.map((square, id) => {
        return <SquareComponent key={'sq' + id} square={square}></SquareComponent>;
      })}
    </div>
  );
};
