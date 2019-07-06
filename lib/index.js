#!/usr/bin/env node
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var chalk = _interopDefault(require('chalk'));
var inquirer = require('inquirer');
var childProcess = _interopDefault(require('child_process'));
var ora = _interopDefault(require('ora'));
var shelljs = _interopDefault(require('shelljs'));
var path = _interopDefault(require('path'));
var fs = _interopDefault(require('fs'));
var nodePlop = _interopDefault(require('node-plop'));

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var logInfo = console.log;
var logger = {
    info: logInfo,
    warning: function (message) { return console.log(chalk.red(message)); },
};

var _this = undefined;
// https://stackoverflow.com/questions/46354368/how-to-have-cli-spinner-run-during-shelljs-command-exec
var runLongExec = function (command) {
    return new Promise(function (resolve, reject) {
        var spawnedProcess = childProcess.spawn(command, { shell: true });
        spawnedProcess.on('exit', resolve);
        spawnedProcess.on('error', reject);
    });
};
var execWithSpinner = function (command, successMessage, options) { return __awaiter(_this, void 0, void 0, function () {
    var spinner, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                spinner = ora();
                spinner.start("Running: " + chalk.yellow(options && options.trim ? command.replace(options.trim, '') : command));
                return [4 /*yield*/, runLongExec(command)];
            case 1:
                response = _a.sent();
                spinner.succeed(successMessage);
                return [2 /*return*/, response];
        }
    });
}); };
var exec = function (command, silent) {
    if (silent === void 0) { silent = true; }
    return shelljs.exec(command, { silent: silent });
};
var execInProject = function (projectName) { return function (command) {
    return exec("cd " + projectName + " && " + command);
}; };
var execInProjectWithSpinner = function (projectName) { return function (command, successMessage) {
    var goToProjectDir = "cd " + projectName + " && ";
    return execWithSpinner("" + goToProjectDir + command, successMessage, {
        trim: goToProjectDir,
    });
}; };
var shell = {
    exec: exec,
    execWithSpinner: execWithSpinner,
    execInProject: execInProject,
    execInProjectWithSpinner: execInProjectWithSpinner,
};

var _this$1 = undefined;
var update = function (fileName) { return function (_a, updateFile) {
    var projectName = _a.projectName, message = _a.message, messageSuccess = _a.messageSuccess;
    return __awaiter(_this$1, void 0, void 0, function () {
        var spinner, jsonFilePath, jsonFile, updatedJsonFile;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    spinner = ora();
                    spinner.start(message);
                    jsonFilePath = path.join(process.cwd(), projectName, fileName);
                    delete require.cache[jsonFilePath];
                    jsonFile = require(jsonFilePath);
                    return [4 /*yield*/, updateFile(jsonFile)];
                case 1:
                    updatedJsonFile = _b.sent();
                    fs.writeFileSync(jsonFilePath, JSON.stringify(updatedJsonFile, null, 2));
                    spinner.succeed(messageSuccess);
                    return [2 /*return*/];
            }
        });
    });
}; };
var json = {
    update: update,
};

var _this$2 = undefined;
var nodePlopGenerator = nodePlop(path.join(__dirname, 'plopfile.js'));
var runActions = function (projectName, generatorName) { return __awaiter(_this$2, void 0, void 0, function () {
    var spinner;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                spinner = ora();
                spinner.start("Creating " + generatorName);
                return [4 /*yield*/, nodePlopGenerator.getGenerator(generatorName).runActions({ projectFolder: projectName })];
            case 1:
                _a.sent();
                spinner.succeed(generatorName + " created");
                return [2 /*return*/];
        }
    });
}); };
var generator = {
    runActions: runActions,
};

var _this$3 = undefined;
var addFilesToGit = function (projectName) { return __awaiter(_this$3, void 0, void 0, function () {
    var code;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = shell.exec('git --version').code;
                if (code !== 0) {
                    return [2 /*return*/, logger.warning('✓ git not found. skipping this step')];
                }
                return [4 /*yield*/, shell.execInProjectWithSpinner(projectName)('git add .', 'New files were added to git')];
            case 1:
                _a.sent();
                return [4 /*yield*/, shell.execInProjectWithSpinner(projectName)('git commit -m "feat: bootstrap application"', 'Changes were checked to version control.')];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var checkYarn = function () { return __awaiter(_this$3, void 0, void 0, function () {
    var code;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = shell.exec('yarn --version').code;
                if (!(code !== 0)) return [3 /*break*/, 2];
                logger.info("Yarn not found. Installing yarn on your machine " + chalk.blue('https://github.com/yarnpkg/yarn'));
                return [4 /*yield*/, shell.execWithSpinner('npm install -g yarn', 'yarn installed')];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); };
var checkNpx = function () { return __awaiter(_this$3, void 0, void 0, function () {
    var code;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = shell.exec('npx --version').code;
                if (!(code !== 0)) return [3 /*break*/, 2];
                logger.info("Npx not found. Installing npx on your machine " + chalk.blue('https://github.com/zkat/npx'));
                return [4 /*yield*/, shell.execWithSpinner('npm install -g npx', 'npx installed')];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); };
var initializeCreateReactApp = function (projectName) { return __awaiter(_this$3, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, shell.execWithSpinner("npx create-react-app " + projectName + " --typescript", 'Create React App initialized')];
            case 1:
                _a.sent();
                return [4 /*yield*/, shell.execInProjectWithSpinner(projectName)("yarn remove @types/jest @types/node @types/react @types/react-dom && yarn add @types/jest @types/node @types/react @types/react-dom -D", '@types moved to devDependencies')];
            case 2:
                _a.sent();
                return [4 /*yield*/, shell.execInProject(projectName)('rm README.md')];
            case 3:
                _a.sent();
                return [4 /*yield*/, generator.runActions(projectName, 'README.md')];
            case 4:
                _a.sent();
                return [4 /*yield*/, json.update('tsconfig.json')({
                        projectName: projectName,
                        message: 'Adding baseUrl to tsconfig.json',
                        messageSuccess: 'Added baseUrl to tsconfig.json',
                    }, function (jsonFile) {
                        jsonFile.compilerOptions.baseUrl = 'src';
                        return jsonFile;
                    })];
            case 5:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var cleanPackageJson = function (projectName) {
    return json.update('package.json')({
        projectName: projectName,
        message: 'Cleaning up package.json',
        messageSuccess: 'package.json cleaned up',
    }, function (jsonFile) {
        delete jsonFile.private;
        delete jsonFile.browserslist;
        delete jsonFile.eslintConfig;
        delete jsonFile.scripts.eject;
        return jsonFile;
    });
};
var addEditorConfig = function (projectName) {
    return generator.runActions(projectName, '.editorconfig');
};
var addBrowsersList = function (projectName) {
    return generator.runActions(projectName, '.browserslistrc');
};
var addPrettier = function (projectName) { return __awaiter(_this$3, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, json.update('package.json')({
                    projectName: projectName,
                    message: 'Adding format to scripts',
                    messageSuccess: 'format added to scripts',
                }, function (jsonFile) {
                    jsonFile.scripts.format = "prettier --write '*/**/*.{ts,tsx,css,md,json}'";
                    return jsonFile;
                })];
            case 1:
                _a.sent();
                return [4 /*yield*/, shell.execInProjectWithSpinner(projectName)('yarn add prettier -D', 'prettier installed')];
            case 2:
                _a.sent();
                return [4 /*yield*/, generator.runActions(projectName, '.prettierrc')];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var addStyleLint = function (projectName) { return __awaiter(_this$3, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, json.update('package.json')({
                    projectName: projectName,
                    message: 'Adding lint:css to scripts',
                    messageSuccess: 'lint:css added to scripts',
                }, function (jsonFile) {
                    jsonFile.scripts['lint:css'] = "stylelint 'src/**/*.{ts,tsx}'";
                    return jsonFile;
                })];
            case 1:
                _a.sent();
                return [4 /*yield*/, shell.execInProjectWithSpinner(projectName)('yarn add stylelint @strv/stylelint-config-styled-components stylelint-config-prettier -D', 'stylelint installed')];
            case 2:
                _a.sent();
                return [4 /*yield*/, generator.runActions(projectName, '.stylelintrc')];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var addEslint = function (projectName) { return __awaiter(_this$3, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, json.update('package.json')({
                    projectName: projectName,
                    message: 'Adding lint:ts to scripts',
                    messageSuccess: 'lint:ts added to scripts',
                }, function (jsonFile) {
                    jsonFile.scripts['lint:ts'] = "eslint 'src/**/*.{ts,tsx}'";
                    return jsonFile;
                })];
            case 1:
                _a.sent();
                return [4 /*yield*/, shell.execInProjectWithSpinner(projectName)('yarn add eslint @strv/eslint-config-react @strv/eslint-config-typescript @strv/stylelint-config-styled-components @typescript-eslint/parser eslint-config-prettier eslint-plugin-react-hooks -D', 'eslint installed')];
            case 2:
                _a.sent();
                return [4 /*yield*/, generator.runActions(projectName, '.eslintrc.js')];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var addGitHooks = function (projectName) { return __awaiter(_this$3, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, shell.execInProjectWithSpinner(projectName)('yarn add husky lint-staged @commitlint/cli @commitlint/config-conventional -D', 'eslint installed')];
            case 1:
                _a.sent();
                return [4 /*yield*/, generator.runActions(projectName, 'commitlint.config.js')];
            case 2:
                _a.sent();
                return [4 /*yield*/, generator.runActions(projectName, '.huskyrc')];
            case 3:
                _a.sent();
                return [4 /*yield*/, generator.runActions(projectName, '.lintstagedrc')];
            case 4:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var addBasicProjectFiles = function (projectName) { return __awaiter(_this$3, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, shell.execInProjectWithSpinner(projectName)('rm -r src/*', 'Old project structure removed')];
            case 1:
                _a.sent();
                return [4 /*yield*/, shell.execInProjectWithSpinner(projectName)('yarn add react-router react-router-dom styled-components && yarn add @types/react-router-dom @types/styled-components jest-styled-components @testing-library/react -D', 'Essential libraries installed')];
            case 2:
                _a.sent();
                return [4 /*yield*/, generator.runActions(projectName, '.env')];
            case 3:
                _a.sent();
                return [4 /*yield*/, generator.runActions(projectName, 'src')];
            case 4:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };

var _this$4 = undefined;
var main = function () { return __awaiter(_this$4, void 0, void 0, function () {
    var projectName;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logger.info("This app generator is built on top of Create React App (" + chalk.blue('https://github.com/facebook/create-react-app') + ".");
                return [4 /*yield*/, inquirer.prompt({
                        name: 'projectName',
                        message: 'How do you want to call your project?',
                    })];
            case 1:
                projectName = (_a.sent()).projectName;
                return [4 /*yield*/, checkYarn()];
            case 2:
                _a.sent();
                return [4 /*yield*/, checkNpx()];
            case 3:
                _a.sent();
                return [4 /*yield*/, initializeCreateReactApp(projectName)];
            case 4:
                _a.sent();
                return [4 /*yield*/, cleanPackageJson(projectName)];
            case 5:
                _a.sent();
                return [4 /*yield*/, addEditorConfig(projectName)];
            case 6:
                _a.sent();
                return [4 /*yield*/, addBrowsersList(projectName)];
            case 7:
                _a.sent();
                return [4 /*yield*/, addPrettier(projectName)];
            case 8:
                _a.sent();
                return [4 /*yield*/, addStyleLint(projectName)];
            case 9:
                _a.sent();
                return [4 /*yield*/, addEslint(projectName)];
            case 10:
                _a.sent();
                return [4 /*yield*/, addGitHooks(projectName)];
            case 11:
                _a.sent();
                return [4 /*yield*/, addBasicProjectFiles(projectName)];
            case 12:
                _a.sent();
                return [4 /*yield*/, addFilesToGit(projectName)];
            case 13:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
main();
