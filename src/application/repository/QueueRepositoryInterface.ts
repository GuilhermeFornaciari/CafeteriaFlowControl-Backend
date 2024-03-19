import Queue from "../../domain/queue";

export default interface QueueRepositoryInterface {
    save(queue: Omit<Queue, 'id'>): Promise<Queue>,
    getAll(organizationId: String): Promise<Array<Queue>>,
    getOne(id: String): Promise<Queue>,
    updateAll(sequence: Array<String>, id: string): Promise<void>,
    delete(id: String): Promise<void>,
}