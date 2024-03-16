import Queue from "../../domain/queue";

export default interface QueueRepositoryInterface {
    save(queue: Omit<Queue, 'id'>): Promise<Queue>,
    GetAll(organizationId: String): Promise<Array<Queue>>,
    GetOne(id: String): Promise<Queue>,
    updateAll(sequence: Array<String>): Promise<void>,
    delete(id: String): Promise<void>,
}