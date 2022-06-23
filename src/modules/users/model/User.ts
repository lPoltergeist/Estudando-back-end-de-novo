import { v4 as uuidV4 } from "uuid";

class User {
  id?: string;
  name: string;
  email: string;
  admin: boolean;
  created_At: Date;
  updated_At: Date;

  constructor() {
    if(!this.id) {
      this.id = uuidV4();
    }

    if(!this.admin) {
      this.admin = false;
    }
  }
}

export { User };
