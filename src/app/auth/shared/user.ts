export class User {
  id: number;
  username: string;
  email = '';
  admin = false;
  name: string;
  surname: string;
  password: string;

  constructor(fields?: User) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
