const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
// paths to create new file
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
// created employee array and requiring the render function file
const render = require("./lib/htmlRenderer");
const employeeObjects = [];

// questions for inquirer to prompt user on employees
const questions = [
    {
        type: "list",
        message: "Select an employee to add to your team. If there are no more employees, select 'no more employees.",
        name: "employeeType",
        choices: [
            "Manager",
            "Engineer",
            "Intern",
            "No more employees"
        ]
    }
];
const managerQ = [
    {
        type: "input",
        message: "Enter employee name:",
        name: "name"
    },
    {
        type: "input",
        message: "Enter employee email:",
        name: "email"
    },
    {
        type: "input",
        message: "Enter employee ID:",
        name: "id"
    },
    {
        type: "input",
        message: "Enter the office number:",
        name: "officeNumber"
    }
]
const engineerQ = [
    {
        type: "input",
        message: "Enter employee name:",
        name: "name"
    },
    {
        type: "input",
        message: "Enter employee email:",
        name: "email"
    },
    {
        type: "input",
        message: "Enter employee ID:",
        name: "id"
    },
    {
        type: "input",
        message: "Enter GitHub username:",
        name: "github",
    }
]
const internQ = [
    {
        type: "input",
        message: "Enter employee name:",
        name: "name"
    },
    {
        type: "input",
        message: "Enter employee email:",
        name: "email"
    },
    {
        type: "input",
        message: "Enter employee ID:",
        name: "id"
    },
    {
        type: "input",
        message: "What university did they attend?",
        name: "school",
    }
]
// function to initiate the program and begin the loop to prompt the user for team information
function mainMenu() {
    const response = inquirer
    .prompt(questions)
    .then(function (response) {
        if (response.employeeType === "Manager") {
            manager();
        } else if (response.employeeType === "Engineer") {
            engineer();
        } else if (response.employeeType === "Intern") {
            intern();
        } else if (response.employeeType === "No more employees") {
            stop();
        }
    });
}
// function to create new Manager constructor and push into array
function manager() {
    inquirer.prompt(managerQ)
    .then(function(response) {
        let newManager = new Manager (response.name, response.id, response.email, response.officeNumber);
        employeeObjects.push(newManager);
        mainMenu();
    }) 
}
// function to create new Engineer constructor and push into array
function engineer() {
    inquirer.prompt(engineerQ)
    .then(function(response) {
        let newEngineer = new Engineer (response.name, response.id, response.email, response.github);
        employeeObjects.push(newEngineer);
        mainMenu();
    }) 
}
// function to create new Intern constructor and push into array
function intern() {
    inquirer.prompt(internQ)
    .then(function(response) {
        let newIntern = new Intern (response.name, response.id, response.email, response.school);
        employeeObjects.push(newIntern);
        mainMenu();
    }) 
}
// function to stop the loop and render the created employees
function stop() {
    const team = render(employeeObjects);
    writeFile(team);
}
// function to create and write the newly created file
function writeFile(team) {
    fs.writeFile(outputPath, team, function (err) {
        if (err) throw err;
        console.log("success!");
    })
}
// Calling the function to initiate the program
mainMenu();