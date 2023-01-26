const inquirer = require('inquirer')

const addTeamMember = async () => {
        try{
                const memberType = await inquirer.prompt([
                        {
                                type: 'list',
                                name: 'type',
                                message: 'What team member would you like to add?',
                                choices: ['engineer', 'intern', 'exit']
                         }
                ])
                
                // instead make memberinfo an array and have a new thing that pushes to it in the if/else
                let memberInfo;
                if (memberType.type === "engineer") {
                        memberInfo = await inquirer.prompt([
                                {
                                        type: 'input',
                                        name: 'name',
                                        message: "What is their name?"
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
                                        name: 'github',
                                        message: "What is their github username?"
                                },
                        ])
                } else if (memberType.type === "intern"){
                        memberInfo = await inquirer.prompt([
                                {
                                        type: 'input',
                                        name: 'name',
                                        message: "What is their name?"
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
                                        name: 'school',
                                        message: "What school do/did they go to?"
                                },
                        ])
                } else {
                        return "exit"
                }

                memberInfo["type"] = memberType.type
                return memberInfo
        } catch (err) {
                console.log(err)
        }
}

module.exports = addTeamMember;