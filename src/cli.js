import inquirer from 'inquirer';
import createProject from "./main";

const options = [
	{
		name: "test",
		type: "list",
		message: "Select which testing framework to use ",
		choices: ["react-testing-library", "enzyme"],
		default: "react-testing-library"
	},
	{
		name: "coverage",
		type: "confirm",
		message: "Include coverage",
		default: true
	},
	{
		name: "git",
		type: "confirm",
		message: "Initialize git repository",
		default: true,
	},
];

async function promptForOptions(projectName) {
	if(!projectName) {
		options.unshift({
			name: "projectName",
			type: "input",
			message: "Enter project name",
			default: 'my-project'
		})
	}
	return inquirer.prompt(options)
}

export async function cli(args) {
	const projectName = args[2];
	const selectedOptions = await promptForOptions(projectName);
	if (projectName) {
		selectedOptions.projectName = projectName;
	}
	console.log(selectedOptions);
	await createProject(selectedOptions);
}
