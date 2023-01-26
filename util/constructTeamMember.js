const Engineer = require('../lib/Engineer');
const Intern = require('../lib/Intern');
const Manager = require('../lib/Manager');

function constructTeamMember(newMember, teamArr) {
        if (newMember.type === "manager") {
                let manager = new Manager(newMember.name, newMember.id, newMember.email, newMember.officeNumber)
                teamArr.push(manager)
        } else if(newMember.type === "engineer") {
                let engineer = new Engineer(newMember.name, newMember.id, newMember.email, newMember.github)
                teamArr.push(engineer)
        } else if (newMember.type === "intern") {
                let intern = new Intern(newMember.name, newMember.id, newMember.email, newMember.school)
                teamArr.push(intern)
        }
}

module.exports = constructTeamMember;