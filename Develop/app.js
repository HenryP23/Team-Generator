const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Choice = require("inquirer/lib/objects/choice");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

var id = 1;
var endApp = false;
const questions = [
    {
        type: "list",
        name: 'startApp',
        message: 'Would you like to add an employee to your team?: ',
        choices: ["Yes", "No"],
        default: "No"
       
    },
    {
        type: "list",
        name: 'role',
        message: 'What is your employee\'s role?: ',
        choices: ["Intern", "Engineer", "Manager"],
        default: "Intern",
        when: (answers) => answers.startApp === 'Yes'
    },
    {
        type: 'input',
        name: 'name',
        message: 'Enter employee\'s name: ',
        when: (answers) => answers.startApp === 'Yes'
    },
    {
        type: 'input',
        name: 'school',
        message: 'Enter the employee\'s school : ',
        when: (answers) => answers.role === 'Intern'
       
    },
    {
        type: 'input',
        name: 'github',
        message: `Enter the employee\'s github username: `,
        when: (answers) => answers.role === 'Engineer'
    },
    {
        type: 'input',
        name: 'officeNumber',
        message: `Enter the employee\'s office number: `,
        when: (answers) => answers.role === 'Manager'
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter the employee\'s email: ',
        when: (answers) => answers.startApp === 'Yes'
    },
    {
        type: 'input',
        name: 'id',
        message: 'Enter the employee\'s id: ',
        when: (answers) => answers.startApp === 'Yes'
    },
];

const teamMembers = [];


function init() {
   inquirer.prompt(questions).then(answers => {

    if(answers.startApp === "No")
    {
        endApp = true;
        return;
    }
    else if (answers.role === "Intern")
    {
        name = answers.name;
        id = answers.id;
        email = answers.email;
        school = answers.school;

        const employee = new Intern(name, id, email, school);
        teamMembers.push(employee);
    }
    else if(answers.role === "Engineer")
    {
        name = answers.name;
        id = answers.id;
        email = answers.email;
        github = answers.github;

        const employee = new Engineer(name, id, email, github);
        teamMembers.push(employee);
    }
    else
    {
        name = answers.name;
        id = answers.id;
        email = answers.email;
        office = answers.officeNumber;

        const employee = new Manager(name, id, email, office);
        teamMembers.push(employee);
    }

   
    
}).then(() => {
    if(!endApp)
    {
    console.log(render(teamMembers));
    fs.writeFile("output/team.html", render(teamMembers), function(err){
        if(err) throw err;
        console.log("Updated!");
        init();
    })
}
    
})


};

init();




// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
