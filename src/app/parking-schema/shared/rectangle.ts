export class Rectangle {
  x: number;
  y: number;
  note: string;
  w: number;
  h: number;

  constructor(fields?: Rectangle) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
