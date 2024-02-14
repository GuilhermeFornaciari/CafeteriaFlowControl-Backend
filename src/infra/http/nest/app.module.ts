import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { databaseProviders as connectDatabase } from './mongodbProvider';
import ManagerController from './../../http/nest/controllers/Manager.controller';
import ManagerMongooseRepository from '../../repository/mongoDB/repositories/ManagerMongooseRepository';
import LogoutMongooseRepository from '../../repository/mongoDB/repositories/LogoutMongooseRepository';
import StudentController from './controllers/Student.controller';
import StudentsMongooseRepository from '../../repository/mongoDB/repositories/StudentMongooseRepository';
import { loginRequired } from './middleware/middlewareDeLogin';
import LogoutController from './controllers/Logout.controller';
@Module({
    controllers: [
        ManagerController,
        StudentController,
        LogoutController,
    ],
    providers: [
        connectDatabase,
        ManagerMongooseRepository,
        StudentsMongooseRepository,
        LogoutMongooseRepository,
    ],
    exports: [connectDatabase]
})
export class AppModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(loginRequired)
        .exclude({path: 'manager', method: RequestMethod.POST})
        .forRoutes('*')
    }
}