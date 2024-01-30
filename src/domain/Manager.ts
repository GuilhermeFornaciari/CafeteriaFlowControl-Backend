export default class Manager {
    constructor(readonly user: string, readonly password: string) {}
  
    static create(props: managerDto) {
      return new Manager(props.user, props.password);
    }
  }
  
  export type managerDto = {
    user: string;
    password: string;
  };