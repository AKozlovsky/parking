export class Place {
  park_number: string;
  first_name: string;
  last_name: string;
  vacation_start: Date;
  vacation_end: Date;
  occupancy_status: boolean;

  constructor(fields?: Place) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
