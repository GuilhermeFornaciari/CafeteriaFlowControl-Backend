import { Injectable } from '@nestjs/common';
import ManagerRepositoryInterface from 'src/application/repository/ManagerRepositoryInterface';
import crypto from "crypto";
import * as bcrypt from 'bcrypt';


@Injectable()
export default class ManagerMemoryRepository implements ManagerRepositoryInterface {
    private managerDatabase: Array<any> = []
    private blacklistDataBase: Array<any> = []

    async save(manager): Promise<void> {
    const password = await bcrypt.hash(manager.password, 6);
        this.managerDatabase.push({
            name: manager.name,
            password: password,
            type: manager.type,
            id: crypto.randomUUID(),
            organizationId: crypto.randomUUID(),
        })
    }

    async GetOne(name: string): Promise<any> {
    const manager = await this.managerDatabase.find(
        (databaseManager) => databaseManager.name === name);
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
    await this.blacklistDataBase.push({
    bannedToken: token,
    })
  }
}
