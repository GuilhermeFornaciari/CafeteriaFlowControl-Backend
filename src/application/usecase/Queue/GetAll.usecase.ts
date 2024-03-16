import QueueRepositoryInterface from "../../repository/QueueRepositoryInterface";

export default class GetAllQueue {
    constructor(readonly repo: QueueRepositoryInterface) {}
    async execute(props: Input): Promise<Output[]> {
        const GetAllQueue = (await this.repo.GetAll(props.OrganizationId)).map((Data) => {
            return {
                sequence: Data.sequence,
                id: Data.id,
                organizationId: Data.organizationId
            }})
        return GetAllQueue
    }
}

export type Input = {
    OrganizationId: String,
}

export type Output = {
    sequence: Array<String>,
    id: String,
    organizationId: String,
}