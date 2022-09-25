const Intern = require('../lib/Intern')

test('creates an Intern object', () => {
    const intern = new Intern('Kevin', 43782, 'test@gmail', 'Depaul')

    expect(intern.school).toEqual(expect.any(String))
})

test('gets employees school', () => {
    const intern = new Intern('Kevin', 43782, 'test@gmail', 'Depaul')

    expect(intern.getSchool()).toEqual(expect.stringContaining(intern.school.toString()))
})

test('gets role of employee', () => {
    const intern = new Intern('Kevin', 43782, 'test@gmail', 'Depaul')

    expect(intern.getRole()).toEqual('Intern')
})