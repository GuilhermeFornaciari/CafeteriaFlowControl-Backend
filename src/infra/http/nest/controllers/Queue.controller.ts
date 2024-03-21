import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
  } from '@nestjs/common';

import SaveQueue from '../../../../application/usecase/Queue/Save.usecase';
import { Input as QueueInput} from '../../../../application/usecase/Queue/Save.usecase';
import GetAllQueue from '../../../../application/usecase/Queue/GetAll.usecase';
import GetOneQueue from '../../../../application/usecase/Queue/GetOne.usecase';
import DeleteQueue from '../../../../application/usecase/Queue/Delete.usecase';
import UpdateAllQueue from '../../../../application/usecase/Queue/UpdateAll.usecase';
import QueueMongooseRepository from '../../../../infra/repository/mongoDB/repositories/QueueMongooseRepository';

@Controller('queue')
export default class QueueController {
    constructor(readonly repoQueue: QueueMongooseRepository) {}
    @Post()
    async save(@Body() queueData: QueueInput) {
        const usecase = new SaveQueue(this.repoQueue)
        return await usecase.execute(queueData)
    }

    @Get(':organizationId')
    async getAll(@Param('organizationId') organizationId: String) {
        const usecase = new GetAllQueue(this.repoQueue)
        await usecase.execute({OrganizationId: organizationId})
    }

    @Get('/getOne/:id')
    async getOne(@Param('id') id: String) {
        const usecase = new GetOneQueue(this.repoQueue)
        return await usecase.execute({id: id})
    }

    @Delete(':id')
    async delte(@Param('id') id: String) {
        const usecase = new DeleteQueue(this.repoQueue)
        return await usecase.execute({id: id})
    }

    @Put(':id')
    async updateAll(@Body()sequence: Array<String>, @Param('id') id: String) {
        const usecase = new UpdateAllQueue(this.repoQueue)
        return await usecase.execute({sequence: sequence, id: id})
    }
}