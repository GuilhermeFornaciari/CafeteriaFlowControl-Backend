import { Injectable } from '@nestjs/common';
import ManagerRepositoryInterface from 'src/application/repository/ManagerRepositoryInterface';
import managerModel from '../models/MongooseModelManager';
import TokenModel from '../models/MongooseModelBlackList';
@Injectable()
export default class ManagerMongooseRepository implements ManagerRepositoryInterface {
    model = managerModel
  async GetOne(name: string): Promise<any> {
    const student = await this.model.findOne({name: name})
    if(!student)
      throw new Error("Administrador não encontrado")
    const returnManager = {
      name: student.name,
      password: student.password,
      type: student.type,
      id: student.id,
      organizationId: student.organizationId,
    }
    return returnManager;
  }

  async logout(token: string): Promise<void> {
    await TokenModel.create({
    bannedToken: token,
    })
  }
}
