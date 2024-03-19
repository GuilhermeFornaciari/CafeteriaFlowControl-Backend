import axios from "axios";
import mongoose from "mongoose";
import SaveQueue from "../../Queue/Create.usecase";
import { config } from 'dotenv';
import QueueMongooseRepository from "../../../../infra/repository/mongoDB/repositories/QueueMongooseRepository";
import GetAllQueue from "../../Queue/GetAll.usecase";
config();

async function login(organizationId?) {
    const randomUser = Math.random().toString(36).slice(-10);
    const randomUser1 = Math.random().toString(36).slice(-10);
    const dataPostOrganization = {
      organization: {
          name: 'CAED Cacoal'
      },
      manager: {
          name: randomUser,
          password: '12345678',
          type: 'Servidor da CAED',
      }
  }
    const inputLogin = {
      user : dataPostOrganization.manager.name,
      password: dataPostOrganization.manager.password
    }
    const inputPostManager = {
      name: randomUser1,
      password: dataPostOrganization.manager.password,
      type: dataPostOrganization.manager.type
    }
    const organizationPost = await axios.post('http://localhost:3000/Organization',
    dataPostOrganization);
    const AxiosOutput = await axios.post(
      'http://localhost:3000/Admin',
      inputLogin
    );
    const managerPost = await axios.post(
      'http://localhost:3000/Admin/' + organizationId, inputPostManager,
      {
        headers: {authorization: AxiosOutput.data.token}
      },
    )
    const ObjectLogin = {
      manager: {
        name: organizationPost.data.name,
        type: organizationPost.data.type,
        id: organizationPost.data.id,
        organizationId: organizationPost.data.organizationId
      },
      token : AxiosOutput.data.token
    }
    return ObjectLogin
}

test("Deve testar o caso de uso, saveQueue", async() => {
    await mongoose.connect(process.env.connectionString as string);
    const newLogin = await login()
    const validInput = {
        sequence: ['shhh', 'shhh', 'shhhh'],
        organizationId: newLogin.manager.organizationId
    }
    const queue = new SaveQueue(new QueueMongooseRepository())
    const idQueue = await queue.execute(validInput)
    const validInput1 = {
        sequence: ['shhh', 'shhh', 'shhhh'],
        organizationId: newLogin.manager.organizationId
    }
    const idQueue1 = await queue.execute(validInput1)
    const getAllQueues = new GetAllQueue(new QueueMongooseRepository())
    const queues = await getAllQueues.execute({OrganizationId: newLogin.manager.organizationId})
    const oneQueue = queues.find((Data) => Data.id === idQueue.id)
    expect(oneQueue.id).toBe(idQueue.id)
    const oneQueue1 = queues.find((Data) => Data.id === idQueue1.id)
    expect(oneQueue1.id).toBe(idQueue1.id)
}, 15000)