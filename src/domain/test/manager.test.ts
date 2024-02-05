import Manager from "../Manager"
import ManagerMemoryRepository from '../../infra/repository/memory/ManagerMemoryRepository'


test('Deve testar o método create da entidade Manager', () => {
    const validInput = {
        name: 'Júlio',
        password: '123456789'
    }
    const manager = Manager.create(validInput)
    expect(manager).toBeDefined()
})

test('deve validar uma senha que está correta a partir de um manager temporário', async () => {
    const validInput = {
        name: 'Júlio César Aguiar',
        password: '123456789',
        type: true
    }
    const manager = Manager.create(validInput)
    const repo = new ManagerMemoryRepository();
    await repo.save(validInput)
    const getManager = await repo.GetOne(validInput.name)
    const IsPasswordValid = await manager.validPassword(getManager.password)
    expect(IsPasswordValid).toBe(true)
}, 15000)

test('deve lançar um erro caso a senha seja a incorreta', async() => {
    const validInput = {
        name: 'Júlio César Aguiar',
        password: '123456789',
        type: true
    }
    const wrongPassword = '12345678'
    const manager = Manager.create(validInput)
    const repo = new ManagerMemoryRepository();
    await repo.save(validInput)
    const getManager = await repo.GetOne(validInput.name)
    const IsPasswordValid = await manager.validPassword(wrongPassword)
    expect(IsPasswordValid).toBe(false)
}, 15000)