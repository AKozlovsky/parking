export class Line {
  moveTo: { x: number; y: number };
  lineTo: { x: number; y: number };
  note: string;

  constructor(fields?: Line) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
