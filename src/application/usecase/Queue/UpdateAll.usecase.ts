import QueueRepositoryInterface from "../../repository/QueueRepositoryInterface";

export default class UpdateAllQueue {
    constructor(readonly repo: QueueRepositoryInterface) {}
    async execute(props: Input): Promise<void>{
       await this.repo.updateAll(props.sequence)
    }
}

export type Input = {
    sequence: Array<String>,
}
