import {
    Body,
    Controller,
    Get,
    Param,
    Post,
  } from '@nestjs/common';
import ManagerMongooseRepository from '../../../repository/mongoDB/repositories/ManagerMongooseRepository';
import GetOneUseCaseManager from '../../../../application/usecase/Manager/GetOne.usecase';
import LoginUsecaseManager from '../../../../application/usecase/Manager/login.usecase';
import LogoutMongooseRepository from '../../../repository/mongoDB/repositories/LogoutMongooseRepository';
import { input as loginInput } from '../../../../application/usecase/Manager/login.usecase';
@Controller('manager')
export default class ManagerController {
    constructor (readonly repoManager: ManagerMongooseRepository, readonly repoLogout: LogoutMongooseRepository) {}
    
    @Get(':name')
    async findOne(@Param('name') name:string) {
        const usecase = new GetOneUseCaseManager(this.repoManager)
        return await usecase.execute(name);
    }

    @Post()
    async login(@Body() loginData: loginInput) {
        const usecase = new LoginUsecaseManager(this.repoManager, this.repoLogout)
        return await usecase.execute(loginData)
    }
}