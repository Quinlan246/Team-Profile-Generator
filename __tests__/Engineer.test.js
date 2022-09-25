const Engineeer = require('../lib/Engineer')

test('creates an engineer object', () => {
    const engineer = new Engineeer('Kevin', 43872, 'test@gmail', 'quinlan246')

    expect(engineer.github).toEqual(expect.any(String)) 
}) 

test('gets engineer github value', () => {
    const engineer = new Engineeer('Kevin', 43872, 'test@gmail', 'quinlan246')

    expect(engineer.getGithub()).toEqual(expect.stringContaining(engineer.github.toString()))
}) 

test('gets role of employee', () => {
    const engineer = new Engineeer('Kevin', 43872, 'test@gmail', 'quinlan246')

    expect(engineer.getRole()).toEqual('Engineer')
}) 
