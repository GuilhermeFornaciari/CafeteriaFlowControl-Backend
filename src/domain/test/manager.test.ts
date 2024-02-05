import Manager from "../Manager"

const validInput = {
    name: 'Júlio',
    password: '123456789'
}

test('Deve testar o método create da entidade Manager', () => {
    const manager = Manager.create(validInput)
    expect(manager).toBeDefined()
})