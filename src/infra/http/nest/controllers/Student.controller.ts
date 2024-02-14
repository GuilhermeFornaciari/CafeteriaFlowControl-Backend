import {
    Body,
    Controller,
    Get,
    Param,
  } from '@nestjs/common';
import GetOneUseCaseStudent from '../../../../application/usecase/Students/GetOne.usecase';
import GetAllUseCaseStudent from '../../../../application/usecase/Students/GetAll.usecase';
import StudentsMongooseRepository from '../../../repository/mongoDB/repositories/StudentMongooseRepository';

  @Controller('student')
  export default class StudentController {
      constructor (readonly repoStudent: StudentsMongooseRepository) {}
      
      @Get(':registration/:organizationId')
      async findOne(
        @Param('registration') registration:string,
        @Param('organizationId') organizationId: string) {
            const usecase = new GetOneUseCaseStudent(this.repoStudent)
            return await usecase.execute(registration, organizationId);
        }
  
      @Get(':organizationId')
      async login(@Param('organizationId') organizationId: string) {
          const usecase = new GetAllUseCaseStudent(this.repoStudent)
          return await usecase.execute(organizationId)
      }
}