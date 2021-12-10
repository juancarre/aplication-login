
export interface UserInterface {
  name: string;
  email: string;
  password: string;
}

export class UserEntity implements UserInterface{

  constructor(public email: string, public name: string, public password: string) {}

}
