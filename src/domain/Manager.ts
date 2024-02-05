import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

export default class Manager {
  constructor(readonly user: string, readonly password: string) {}

  static create(props: managerDto) {
    if(!props)
      throw new Error("Dados não encontrados")
    return new Manager(props.name, props.password);
  }
  
  public async validPassword(password) {
    const passwordIsValid = await bcrypt.compare(this.password, password)
    if(!passwordIsValid)
        throw new Error("Senha incorreta!")
    return true;
  }

  public async generateToken(managerId) {
    const token = await jwt.sign({managerEntity: managerId}, process.env.secretJWTkey, {expiresIn: '7d'});
    return token;
  }

  static async validToken(token) {
    const verifyToken = jwt.verify(token, process.env.secretJWTkey)
    if(!verifyToken)
      throw new Error("Token inválido")
    return true;
  }
}
  
export type managerDto = {
  name: string;
  password: string;
};