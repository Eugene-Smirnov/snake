const LOCAL_STORAGE_BEST_SCORE_KEY = 'evs-snake-best-score';

class ScoreService {
  getBestPreviousScore(): number {
    return Number(window.localStorage.getItem(LOCAL_STORAGE_BEST_SCORE_KEY) ?? 0);
  }

  setBestPreviousScore(score: number): void {
    window.localStorage.setItem(LOCAL_STORAGE_BEST_SCORE_KEY, `${score}`);
  }

  /**
   * Function updates best score if it less then current score and returns latest bestPreviousScore value
   * @param score - current score value
   * @returns bestPreviousScore
   */
  updateBestScore(score: number): void {
    const currentBestScore = this.getBestPreviousScore();

    if (currentBestScore < score) {
      this.setBestPreviousScore(score);
    }
  }
}

export const scoreService = new ScoreService();
export default scoreService;
