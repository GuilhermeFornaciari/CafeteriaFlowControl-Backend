import { Module } from '@nestjs/common';
import { databaseProviders as connectDatabase } from './mongodbProvider';
import ManagerController from './../../http/nest/controllers/Manager.controller';
import ManagerMongooseRepository from '../../repository/mongoDB/repositories/ManagerMongooseRepository';
import LogoutMongooseRepository from '../../repository/mongoDB/repositories/LogoutMongooseRepository';
import StudentController from './controllers/Student.controller';
import StudentsMongooseRepository from '../../repository/mongoDB/repositories/StudentMongooseRepository';
@Module({
    controllers: [
        ManagerController,
        StudentController
    ],
    providers: [
        connectDatabase,
        ManagerMongooseRepository,
        LogoutMongooseRepository,
        StudentsMongooseRepository,
    ],
    exports: [connectDatabase]
})
export class AppModule {}