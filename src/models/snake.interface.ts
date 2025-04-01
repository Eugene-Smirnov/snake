export interface ISnakeSegment {
  x: number;
  y: number;
}

export interface ISnake {
  // Last element is snake's HEAD
  body: ISnakeSegment[];
  segmentsToGrow: number;
}
