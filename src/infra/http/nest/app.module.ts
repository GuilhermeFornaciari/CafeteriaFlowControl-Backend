import { Module } from '@nestjs/common';
import { databaseProviders as connectDatabase } from './mongodbProvider';
import ManagerController from './../../http/nest/controllers/Manager.controller';
import ManagerMongooseRepository from '../../repository/mongoDB/repositories/ManagerMongooseRepository';
import LogoutMongooseRepository from '../../repository/mongoDB/repositories/LogoutMongooseRepository';
@Module({
    controllers: [
        ManagerController
    ],
    providers: [
        connectDatabase,
        ManagerMongooseRepository,
        LogoutMongooseRepository,
    ],
    exports: [connectDatabase]
})
export class AppModule {}