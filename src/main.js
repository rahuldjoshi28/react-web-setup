import fs from 'fs-extra';
import path from 'path';
import execa from "execa";

const getTargetDir = (projectName) => `${process.cwd()}/${projectName}`;

const getTemplateDir = () => {
    const currentFileUrl = import.meta.url;
    return path.resolve(new URL(currentFileUrl).pathname, '../../templates');
};

const moveConfig = (templateBaseDir, projectBaseDir) => (from, to) => {
    const completeFromPath = `${templateBaseDir}/${from}`;
    const completeToPath = `/${projectBaseDir}/${to}`;
    fs.copySync(completeFromPath, completeToPath);
};

const installDeps = async (targetDir, deps = []) => {
    console.log(`Installing ${deps.length > 0 ? deps : 'all dependencies'} ...`);
    try {
        await execa('npm', ['install', ...deps], {
            cwd: targetDir
        })
    } catch (e) {
        console.error(e);
        return;
    }
    console.log("Installation complete");
};

const createProject = async (options) => {
    const {projectName, test, coverage, git} = options;

    const projectPath = getTargetDir(projectName);
    const templateDir = getTemplateDir();

    console.log(`Creating project ${projectPath}`);

    const move = moveConfig(templateDir, projectPath);

    move("project", "");

    move(`${test}/package.json`, `package.json`);

    if (coverage) {
        move("jest.config.js", "jest.config.js");
    }

    if (git) {
        execa('git', ['init'], {
            cwd: projectPath
        });
    }

    await installDeps(projectPath)
};

export default createProject;