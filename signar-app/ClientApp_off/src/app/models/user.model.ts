export class User {
  // Note: Using only optional constructor properties without backing store disables typescript's type checking for the type
  constructor(id?: string, userName?: string) {

    this.id = id;
    this.userName = userName;
   
  }

  public id: string;
  public userName: string;
  public isEnabled: boolean;
}
