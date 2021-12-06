const inquirer = require('inquirer');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer')
const Intern = require('./lib/Intern')
const fs = require('fs');
const generateTeam = require('./src/generateTeam');


team = [];
const addManager = () => {
    inquirer.prompt ([
        {
            type: "input",
            name: "name",
            message: "Please enter your team manager's name",
            validate: nameInput => {
                if (nameInput){
                    return true;
                }else {
                    console.log("Please enter the manager's name");
                    return false;
                }

            }
        },
        {
            type: "input",
            name: "id",
            message: "Please enter your team manager's id",
           validate: nameInput => {
               if (isNaN(nameInput)){
                   console.log("Please enter manager ID")
                   return false;
               } else {
                   return true;
               }
           }
        },
        {
            type: "input",
            name: "email",
            message: "Please enter your team manager's email",
            validate: email => {
                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                if (valid){
                    return true;
                }else {
                    console.log("Please enter the manager's email");
                    return false;
                }

            }
        },
        {
            type: "input",
            name: "officeNumber",
            message: "Please enter your team manager's office number",
            validate: nameInput => {
                if(isNaN(nameInput)) {
                    console.log("Please enter the manager's office number");
                    return false;
                }else {
                    return true;
                }

            }
        },
        {
            type: "list",
            name: "addTeamMember",
            message: "Add team member?",
            choices: ["Engineer", "Intern", "None"]      
        }     
    ])
    .then((managerAns) => {
        const manager = new Manager(managerAns.id, managerAns.name, managerAns.email, managerAns.officeNumber)
        team.push(manager)
        switch(managerAns.addTeamMember) {
            case "Engineer":
                addEngineer();
                break;
                case "Intern":
                    addIntern();
                    break;
                    default:
                        writeToFile("./dist/index.html", generateTeam(team))
        }
    });
};

const addEngineer = ()  => {
    inquirer.prompt ([
        {
            type: "input",
            name: "name",
            message: "Please enter Engineer's name",
            validate: nameInput => {
                if(nameInput) {
                    return true;
                } else {
                    console.log("Please enter Engineer's name")
                    return false;
                }
            }
        },
         {
            type: "input",
            name: "id",
            message: "Please enter your team manager's id",
           validate: nameInput => {
               if (isNaN(nameInput)){
                   console.log("Please enter manager ID")
                   return false;
               } else {
                   return true;
               }
           }
        },
        {
            type: "input",
            name: "email",
            message: "Please enter Engineer's email",
            validate: email => {
                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                if (valid){
                    return true;
                }else {
                    console.log("Please enter the Engineer's email");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "gitHub",
            message: "Please enter Engineer's github username",
          
        },
        {
            type: "list",
            name: "addTeamMember",
            message: "Add team member?",
            choices: ["Engineer", "Intern", "None"]      
        } 
    ])
    .then((engineerAns) => {
        const engineer = new Engineer (engineerAns.id, engineerAns.name, engineerAns.email,engineerAns.gitHub)
        team.push(engineer)
        switch(engineerAns.addTeamMember) {
            case "Engineer":
                addEngineer();
                break;
                case "Intern":
                addIntern();
                break;
                default:
                    writeToFile("./dist/index.html", generateTeam(team))
        }
    })
};
const addIntern = ()  => {
    inquirer.prompt ([
        {
            type: "input",
            name: "name",
            message: "Please enter Intern's name",
            validate: nameInput => {
                if(nameInput) {
                    return true;
                } else {
                    console.log("Please enter Intern's name")
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "id",
            message: "Please enter Intern's id",
        },
        {
            type: "input",
            name: "email",
            message: "Please enter Intern's email",
            validate: email => {
                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                if (valid){
                    return true;
                }else {
                    console.log("Please enter the Intern's email");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "school",
            message: "Please enter Intern's school",
        },
        {
            type: "list",
            name: "addTeamMember",
            message: "Add team member?",
            choices: ["Engineer", "Intern", "None"]      
        } 
    ])
    .then((internAns) => {
        const intern = new Intern(internAns.id, internAns.name, internAns.email, internAns.school)
        team.push(intern)
        switch(internAns.addTeamMember){
            case "Engineer":
            addEngineer();
            break;
            case 'Intern':
                addIntern();
                break;
                default:
                    writeToFile("./dist/index.html", generateTeam(team))
        }
    })
}
addManager();

function writeToFile(filename, data) {
    fs.writeFile(filename, data, (err) => {
        if(err) throw err;
        console.log("you have successfully written to index.html")
    });
};