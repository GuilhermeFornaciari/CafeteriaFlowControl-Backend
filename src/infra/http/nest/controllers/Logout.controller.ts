import {
    Controller,
    Param,
    Post,
  } from '@nestjs/common';

import LogoutUsecaseManager from '../../../../application/usecase/Manager/logout.usecase';
import LogoutMongooseRepository from '../../../repository/mongoDB/repositories/LogoutMongooseRepository';
@Controller('logout')
export default class LogoutController {
    constructor (readonly repoLogout: LogoutMongooseRepository) {}
    @Post(':token')
    async Logout(@Param('token') token: string) {
        const usecase = new LogoutUsecaseManager(this.repoLogout)
        return await usecase.execute(token)
    }
}