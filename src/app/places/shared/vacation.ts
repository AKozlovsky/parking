export class Vacation {
  park_number: string;
  vacation_start: string;
  vacation_end: string;

  constructor(fields?: Vacation) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
