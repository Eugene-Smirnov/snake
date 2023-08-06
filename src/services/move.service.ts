import { down, left, right, up } from '../store/gameSlice';
import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit';

const MOVE_KEY_CODES = {
  up: 'ArrowUp',
  down: 'ArrowDown',
  left: 'ArrowLeft',
  right: 'ArrowRight',
};

class MoveService {
  public getKeyPressAction(keyCode: string): ActionCreatorWithoutPayload<string> | void {
    switch (keyCode) {
      case MOVE_KEY_CODES.up:
        return up;
      case MOVE_KEY_CODES.down:
        return down;
      case MOVE_KEY_CODES.left:
        return left;
      case MOVE_KEY_CODES.right:
        return right;
      default:
        return;
    }
  }
}

export const moveService = new MoveService();
export default moveService;
