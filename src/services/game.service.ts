export const GAME_SPEED = 500;

class GameService {
  start(cb: () => void): number {
    return window.setInterval(cb, GAME_SPEED);
  }

  stop(intervalID: number): void {
    window.clearInterval(intervalID);
  }
}

export const gameService = new GameService();
export default gameService;
