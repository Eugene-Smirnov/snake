import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import './score.component.scss';
import { GameSliceState } from '../../store/gameSlice';

// type ScoreComponentProps = {};

export const ScoreComponent: FC = () => {
  const score = useSelector<RootState, GameSliceState['score']>(({ game: { score } }) => score);
  const bestScore = useSelector<RootState, GameSliceState['bestScore']>(({ game: { bestScore } }) => bestScore);

  return (
    <div className="score-wrapper">
      <h3 className="score score_current">
        <span>Current:</span> <span>{score}</span>
      </h3>
      <h3 className="score score_best">
        <span>Best:</span> <span>{bestScore}</span>
      </h3>
    </div>
  );
};
