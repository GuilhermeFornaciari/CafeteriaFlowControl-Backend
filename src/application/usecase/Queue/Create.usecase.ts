import QueueRepositoryInterface from "../../repository/QueueRepositoryInterface";
import Queue from "../../../domain/queue";


export default class SaveQueue {
    constructor(readonly repo: QueueRepositoryInterface) {}
    async execute(props: Input): Promise<Output> {
    const queue = new Queue(props.sequence, props.organizationId)
    const repoQueue = await this.repo.save(queue)        
    return {
        sequence: repoQueue.sequence,
        id: repoQueue.id
    }
    }
}

export type Input = {
    sequence: Array<String>,
    organizationId: String,
}

export type Output = {
    sequence: Array<String>,
    id: String,
}