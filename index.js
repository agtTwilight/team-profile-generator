// Import all require things
const inquirer = require('inquirer');
const fs = require('fs');
const Employee = require('./lib/Employee');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');
const util = require("util");
const addTeamMember = require("./util/addTeamMember")
const constructTeamMember = require('./util/constructTeamMember')
const generateHtml = require('./util/generateHtml')

const writePromise = util.promisify(fs.writeFile);
const readPromise = util.promisify(fs.readFile);
// const addTeamMemberPromise = util.promisify(addTeamMember);

let teamArr = [];

// Get team manager then after do something
const init = async () => {
        try{
                // get manager info
                let newMember = await inquirer.prompt([
                        {
                                type: 'input',
                                name: 'name',
                                message: "What is the name of this teams manager?"
                        },
                        {
                                type: 'input',
                                name: 'id',
                                message: "What is their Id?"
                        },
                        {
                                type: 'input',
                                name: 'email',
                                message: "What is their email?"
                        },
                        {
                                type: 'input',
                                name: 'officeNumber',
                                message: "What is their office number?"
                        },
                ])

                newMember["type"] = "manager"

                // construct manager & push to team
                constructTeamMember(newMember, teamArr);
                
                // add new team members
                newMember = await addTeamMember();

                while (newMember.confirm) {
                        // Construct new member and add them to the team!
                        constructTeamMember(newMember, teamArr);
                        // Add new member if applicable
                        newMember = await addTeamMember();
                }

                // contruct and add most recent member
                constructTeamMember(newMember, teamArr);

                console.log(generateHtml(teamArr))
        } catch (err) {
                console.log(err)
        }
}

init();