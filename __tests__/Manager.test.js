const Manager = require('../lib/Manager')

test('creates a Manager object', () => {
    const manager = new Manager('Kevin', 47382, 'test@gmail', 8)

    expect(manager.officeNumber).toEqual(expect.any(Number))
}) 

test('gets role of employee', () => {
    const manager = new Manager('Kevin', 47382, 'test@gmail.com')

    expect(manager.getRole()).toEqual('Manager')
})