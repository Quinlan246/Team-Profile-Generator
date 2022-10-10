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
            validate: nameInput => {
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

