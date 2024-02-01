import ManagerRepositoryInterface from "src/application/repository/ManagerRepositoryInterface";
export default class GetOneUseCaseStudent {
    constructor(readonly repo: ManagerRepositoryInterface) {}
    async execute(props: Input): Promise<Output> {
        const student = await this.repo.GetOne(props.id);
        return {
            token: student.token,
                name: student.name,
                password: student.password,
                type: student.type,
                id: student.id,
                organizationId: student.organizationId,
        }
    }
}

export type Input = {
    id: string;
}

export type Output = {
    token: string,
    name: string,
    password: string,
    type: string,
    id:string,
    organizationId: string,
}