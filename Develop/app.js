const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const data = {}
const employeeObjects = [];
const employeeId = employeeObjects.length+1;
mainMenu();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function mainMenu() {
    const response = inquirer
    .prompt(questions)
    .then(function (response) {
        if (response.employeeType === "Manager") {
            manager();
        } else if (response.employeeType === "Engineer") {
            engineer();
        }
        // created an object to save responses
        // const data = {}
        // data.name = response.name;
        // data.role = response.role;
        // data.id = response.id;
        // data.officeId = response.officeId;
        // data.github = response.github;
        // data.school = response.license;

    });
}

const questions = [
    {
        type: "list",
        message: "Type of employee:",
        name: "employeeType",
        choices: [
            "Manager",
            "Engineer",
            "Intern",
            "No more employees"
        ]
    },
    {
        type: "input",
        message: "Enter employee name:",
        name: "name"
    },
    {
        type: "input",
        message: "Enter employee role:",
        name: "role"
    },
    {
        type: "input",
        message: "Enter employee ID:",
        name: "id"
    },
];

function manager() {
    inquirier.prompt(managerQ)
    .then(function(response) {
        const newManager = new Manager (response.name, employeeId++, response.email, response.officeNumber);
        employeeObjects.push(newManager);
        mainMenu();
    }) 
}

const managerQ = [
    {
        type: "input",
        message: "Enter employee name:",
        name: "name"
    },
    {
        type: "input",
        message: "Enter employee role:",
        name: "role"
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
        message: "Enter employee role:",
        name: "role"
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
        message: "Enter employee role:",
        name: "role"
    },
    {
        type: "input",
        message: "What university did they attend?",
        name: "school",
    }
]

// How do I define how many employees are on the roster? Do I ask one question at the begginning "How many employees including the manager are on the team?" OR at the end of the prompts, ask if they have another team member to add?


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

render(employeeObjects);

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

function writeFile() {
    fs.writeFile(outputPath, variable, function (err) {
        if (err) throw err;
        console.log("success!");
    })
}

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
