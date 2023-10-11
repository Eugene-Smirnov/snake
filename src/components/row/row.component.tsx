import React, { FC, memo } from 'react';
import { SquareComponent } from '../square/square.component';
import './row.component.scss';
import { IRow } from '../../models/field.interface';

type RowComponentProps = {
  row: IRow;
};

export const RowComponent: FC<RowComponentProps> = memo(({ row }: RowComponentProps) => {
  return (
    <div className="row">
      {row.map((square, id) => {
        return <SquareComponent key={'sq' + id} square={square}></SquareComponent>;
      })}
    </div>
  );
});
