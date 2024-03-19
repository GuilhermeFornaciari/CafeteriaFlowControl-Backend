import QueueRepositoryInterface from "../../repository/QueueRepositoryInterface";

export default class GetAllQueue {
    constructor(readonly repo: QueueRepositoryInterface) {}
    async execute(props: Input): Promise<Output[]> {
        const getAllQueue = (await this.repo.getAll(props.OrganizationId)).map((Data) => {
            return {
                sequence: Data.sequence,
                id: Data.id,
                organizationId: Data.organizationId
            }})
            console.log(getAllQueue)
        return getAllQueue
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