const inquirer = require('inquirer')
const fs = require('fs')
const generateHTML = require('./src/generateHTML')
const Manager = require('./lib/Manager')
const Engineer = require('./lib/Engineer')
const Intern = require('./lib/Intern')
const teamArray = []

const addManager = () => {
    return inquirer.prompt ([
        {
            type: 'input',
            name: 'name',
            message: 'Who is the manager of this team?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            meassage: 'Please input the managers ID',
            validate: nameInput => {
                if (isNaN(nameInput)) {
                    return false
                } else {
                    return true
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            meassage: 'Please enter the managers email',
            validate: email => {
                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                if (valid) {
                    return true
                } else {
                    return false
                }
            }
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: 'Please enter the managers office number',
            validate: nameInput => {
                if (isNaN(nameInput)) {
                    return false
                } else {
                    return true
                }
            }
        }
    ])
    .then(managerInput => {
        const {name, id, email, officeNumber} = managerInput;
        const manager = new Manager (name, id, email, officeNumber);

        teamArray.push(manager)

    })
}

const addEmployee = () => {
    return inquirer.prompt ([
        {
            type: 'list',
            name: 'role',
            message: 'Please choose the employees role',
            choices: ['Engineer', 'Intern']
        },
        {
            type: 'input',
            name: 'name',
            message: 'Whats the name of the employee?',
            validate: nameInput => {
                if (nameInput) {
                    return true
                } else {
                    return false
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: 'Please enter the employee id',
            validate: nameInput => {
                if (isNaN(nameInput)) {
                    return false
                } else {
                    return true
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: 'Please enter the employees email',
            validate: email => {
                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                if (valid) {
                    return true
                } else {
                    return false
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Please enter the employees github username',
            when: (input) => input.role === 'Engineer', 
            validate: nameInput => {
                if (nameInput) {
                    return true
                } else {
                    console.log('Please enter the employees github username')
                }
            }    
        },
        {
            type: 'input',
            name: 'school',
            message: 'Please enter the interns school',
            when: (input) => input.role === 'Intern',
            validate: nameInput => {
                if (nameInput) {
                    return true
                } else {
                    console.log('Please enter the interns school')
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAddEmployee',
            message: 'Wouold you like to add more team members?',
            default: false
        }
    ]) 
    .then(employeeData => {
        let {name, id, email, role, github, school, confirmAddEmployee} = employeeData
        let employee

        if (role === 'Engineer') {
            employee = new Engineer (name, id, email, github)

            console.log(employee)
        } else if (role === 'Intern') {
            employee = new Intern (name, id, email, school)

            console.log(employee)
        }

        teamArray.push(employee)
        if (confirmAddEmployee) {
            return addEmployee(teamArray)
        } else {
            return teamArray
        }
    }) 
}

const writeFile = data => {
    fs.writeFile('./dist/index.html', data, err => {
        if (err) {
            console.log(err)
            return
        } else {
            console.log('Your team profile has been successfully created')
        }
    })
}

addManager()
    .then(addEmployee)
    .then(teamArray => {
        return generateHTML(teamArray)
    })
    .then(pageHTML => {
        return writeFile(pageHTML)
    })
    .catch(err => {
        console.log(err)
    })