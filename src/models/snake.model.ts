export const SNAKE_LENGTH = 5;

export interface SnakeSegment {
  x: number;
  y: number;
}

export interface SnakeModel {
  // Last element is snake's HEAD
  body: SnakeSegment[];
  segmentsToGrow: number;
  initBody: () => SnakeSegment[];
}

export class Snake implements SnakeModel {
  body: SnakeSegment[] = [];
  segmentsToGrow: 0;

  constructor() {
    this.body = this.initBody();
  }

  initBody() {
    const body: SnakeSegment[] = [];
    for (let i = 0; i < SNAKE_LENGTH; i++) {
      body.push({ x: i, y: 0 });
    }
    return body;
  }
}
