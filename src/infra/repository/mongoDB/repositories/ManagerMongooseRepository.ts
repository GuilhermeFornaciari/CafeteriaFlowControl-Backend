import { Injectable } from '@nestjs/common';
import ManagerRepositoryInterface from 'src/application/repository/ManagerRepositoryInterface';
import managerModel from '../models/MongooseModelManager';
import TokenModel from '../models/MongooseModelBlackList';
@Injectable()
export default class ManagerMongooseRepository implements ManagerRepositoryInterface {
    model = managerModel
  async GetOne(name: string): Promise<any> {
    const manager = await this.model.findOne({name: name})
    if(!manager)
      throw new Error("Administrador não encontrado")
    const returnManager = {
      name: manager.name,
      password: manager.password,
      type: manager.type,
      id: manager.id,
      organizationId: manager.organizationId,
    }
    return returnManager;
  }

  async logout(token: string): Promise<void> {
    await TokenModel.create({
    bannedToken: token,
    })
  }
}
