import { Injectable } from '@nestjs/common';
import ManagerRepositoryInterface from 'src/application/repository/ManagerRepositoryInterface';
import Manager from 'src/domain/Manager';
import managerModel from '../models/MongooseModelManager';
import TokenModel from '../models/MongooseModelBlackList';
import * as bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import nodeSchedule from 'node-schedule'
import { config } from 'dotenv';
config();

@Injectable()
export default class ManagerMongooseRepository implements ManagerRepositoryInterface {
    model = managerModel
    async login(manager: Manager): Promise<any> {
        if(!manager.user || !manager.password)
            throw new Error("nome de usuário ou senha não informados")
        const [Getmanager] =  await this.model.find({name: manager.user})
        if(!Getmanager) 
            throw new Error("nome de usuário inválido!")
        const passwordIsValid = await bcrypt.compare(manager.password, Getmanager.password)
        if(!passwordIsValid){
            throw new Error("Senha incorreta!")
        } else {
            const token = jwt.sign({managerEntity: Getmanager.id}, process.env.secretJWTkey, {expiresIn: '7d'});
            const objectReturn = {
                token: token,
                manager: {
                    name: Getmanager.name,
                    type: Getmanager.type,
                    id: Getmanager.id,
                    organizationId: Getmanager.organizationId,
                }
            }
            nodeSchedule.scheduleJob("0 0 * * 7", () => this.logout(token))
            return objectReturn;
        }    
    }

    async logout(token: string): Promise<void> {
        const verifyToken = jwt.verify(token, process.env.secretJWTkey)
        if(verifyToken){
            await TokenModel.create({
            bannedToken: token,
            })
          } else {
            throw new Error("Token inválido")
          }
    }
}
