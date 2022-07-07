import React, { FC } from 'react';
import { RowModel } from '../../models/Field.model';
import { Square } from '../square/square';
import './row.scss';

type RowProps = {
  row: RowModel;
};

export const Row: FC<RowProps> = ({ row }: RowProps) => {
  return (
    <div className="row">
      {row.map((square, id) => {
        return <Square key={'sq' + id} square={square}></Square>;
      })}
    </div>
  );
};
