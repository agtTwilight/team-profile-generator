// Import all require things
const inquirer = require('inquirer');
const fs = require('fs');
const util = require("util");
const addTeamMember = require("./util/addTeamMember")
const constructTeamMember = require('./util/constructTeamMember')
const generateHtml = require('./util/generateHtml')

const writePromise = util.promisify(fs.writeFile);
// const addTeamMemberPromise = util.promisify(addTeamMember);

let teamArr = [];

// Get team manager then after do something
const init = async () => {
        try{
                // get manager data
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

                // Add type key w/ manager value to manager data obj
                newMember["type"] = "manager"

                // Construct manager & push to teamArr
                constructTeamMember(newMember, teamArr);
                
                // Create new member data
                newMember = await addTeamMember();

                // while loop that executes until user selects "exit"
                while (newMember != "exit") {
                        // Construct newMember and add them to teamArr!
                        constructTeamMember(newMember, teamArr);
                        // Create new member and repeat loop
                        newMember = await addTeamMember();
                }

                // Write html file with teamArr data
                await writePromise("team.html", generateHtml(teamArr))
                console.log("Your team has been generated!")
        } catch (err) {
                console.log(err)
        }
}

init();