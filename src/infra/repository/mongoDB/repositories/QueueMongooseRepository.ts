import { Injectable } from "@nestjs/common";
import QueueRepositoryInterface from "../../../../application/repository/QueueRepositoryInterface";
import Queue from "../../../../domain/queue";
import queueModel from "../models/MongooseModelQueue";

@Injectable()
export default class QueueMongooseRepository implements QueueRepositoryInterface {
    model = queueModel
    async save(queue: Queue): Promise<Queue> {
        const postQueu = await this.model.create({
            sequence: queue.sequence,
            organizationId: queue.organizationId,
        });
        const post = {
            ...postQueu['_doc'],
            id: postQueu.id,
            _id: undefined,
        }
        return post
    }

    async getAll(organizationId: String): Promise<Queue[]> {
        const queues = await this.model.find({organizationId: organizationId})
        return queues.map((element) => ({
            sequence: element.sequence,
            organizationId: element.organizationId,
            id: element.id,
        }))
    }

    async getOne(id: String): Promise<Queue> {
        return this.model.findById(id)
    }

    async updateAll(sequence: String[], id: string): Promise<void> {
        return this.model.findByIdAndUpdate(id, {
            sequence: sequence
        })
    }

    async delete(id: String): Promise<void> {
        return this.model.findByIdAndDelete(id)
    }
} 