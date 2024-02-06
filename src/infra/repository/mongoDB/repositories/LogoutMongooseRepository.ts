import { Injectable } from '@nestjs/common';
import ManagerRepositoryInterface from 'src/application/repository/ManagerRepositoryInterface';
import TokenModel from '../models/MongooseModelBlackList';
@Injectable()
export default class LogoutMongooseRepository implements ManagerRepositoryInterface {
  async save(token: string): Promise<void> {
    await TokenModel.create({
    bannedToken: token,
    })
  }
  async GetOne(token: string): Promise<any> {
    const isBlackListed = await TokenModel.findOne({bannedToken: token})
    if(!isBlackListed)
      throw new Error("Token não encontrado")
    const returnToken = {
      bannedToken: isBlackListed.bannedToken
    }
    return returnToken
    }
}
