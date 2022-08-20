export class Circle {
  x: number;
  y: number;
  r: number;
  startAngle: number;
  endAngle: number;
  counterclockwise: boolean;
  note: string;

  constructor(fields?: Circle) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
