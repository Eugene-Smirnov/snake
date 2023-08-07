import { down, left, right, toggleGame, up } from '../store/gameSlice';
import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit';

const ACTION_TO_KEY_CODES = {
  UP: 'ArrowUp',
  DOWN: 'ArrowDown',
  LEFT: 'ArrowLeft',
  RIGHT: 'ArrowRight',
  TOGGLE: 'Space',
};

class EventsToActionsService {
  public getKeyPressAction(keyCode: string): ActionCreatorWithoutPayload<string> | void {
    switch (keyCode) {
      case ACTION_TO_KEY_CODES.UP:
        return up;
      case ACTION_TO_KEY_CODES.DOWN:
        return down;
      case ACTION_TO_KEY_CODES.LEFT:
        return left;
      case ACTION_TO_KEY_CODES.RIGHT:
        return right;
      case ACTION_TO_KEY_CODES.TOGGLE:
        return toggleGame;
      default:
        return;
    }
  }
}

export const eventsToActionsService = new EventsToActionsService();
export default eventsToActionsService;
