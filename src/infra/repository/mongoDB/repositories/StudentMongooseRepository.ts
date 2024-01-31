import { Injectable } from '@nestjs/common';
import StudentRepositoryInterface from 'src/application/repository/StudentsRepositoryInterface';
import studentsModel from '../models/MongooseModelStudents';

@Injectable()

export default class StudentsMongooseRepository implements StudentRepositoryInterface {
model = studentsModel

     async GetOne(registration: string): Promise<any> {
        const student = await this.model.findOne({registration: registration})
        if (!student)
            throw new Error("Aluno não encontrado")
        const returnStudent = {
            name: student.name,
            className: student.className,
            type: student.type,
            organizationId: student.organizationId,
            registration: student.registration,
            id: student.registration,
        }
        return returnStudent;
    }

     async GetAll(organizationId: string): Promise<any[]> {
        const students = await this.model.find({organizationId: organizationId})
        if(!students)
            throw new Error("nenhum aluno encontrado")
            students.map((data) => {
                return {
                    name: data.name,
                    className: data.className,
                    type: data.type,
                    organizationId: data.organizationId,
                    registration: data.registration,
                    id: data.id,
                }
            })
            return students
    }
}