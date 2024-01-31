import StudentRepositoryInterface from "src/application/repository/StudentsRepositoryInterface";
import { input } from "../Manager/logout.usecase";

export default class GetOneUseCaseStudent {
    constructor(readonly repo: StudentRepositoryInterface) {}
    async execute(props: Input): Promise<Output> {
        const student = await this.repo.GetOne(props.registration);
        return {
            name: student.name,
            className: student.className,
            type: student.type,
            organizationId: student.organizationId,
            registration: student.registration,
            id: student.id,
        }
    }
}

export type Input = {
    registration: string;
}

export type Output = {
    name: string,
    className: string,
    type: boolean,
    organizationId: string,
    registration: string,
    id?: string,
}