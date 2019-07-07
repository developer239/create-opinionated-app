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

var capitalize = function (word) {
    return word.charAt(0).toUpperCase() + word.substring(1);
};
var toCapitalized = function (name) {
    var words = name.match(/[A-Za-z][a-z]*/gu) || [];
    return words.map(capitalize).join(' ');
};
var words = {
    capitalize: capitalize,
    toCapitalized: toCapitalized,
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
var runActions = function (generatorState, generatorName) { return __awaiter(_this$2, void 0, void 0, function () {
    var spinner, failures;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                spinner = ora();
                spinner.start("[generator] running " + generatorName);
                return [4 /*yield*/, nodePlopGenerator
                        .getGenerator(generatorName)
                        .runActions(generatorState)];
            case 1:
                failures = (_a.sent()).failures;
                if (failures.length) {
                    logger.warning("Failures creating " + generatorName + ": " + JSON.stringify(failures));
                }
                spinner.succeed("[generator] create " + generatorName);
                return [2 /*return*/];
        }
    });
}); };
var generator = {
    runActions: runActions,
};

var _this$3 = undefined;
var addFilesToGit = function (state) { return __awaiter(_this$3, void 0, void 0, function () {
    var code;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = shell.exec('git --version').code;
                if (code !== 0) {
                    return [2 /*return*/, logger.warning('✓ git not found. skipping this step')];
                }
                return [4 /*yield*/, shell.execInProjectWithSpinner(state.projectFolder)('git add .', '[git] add new files')];
            case 1:
                _a.sent();
                return [4 /*yield*/, shell.execInProjectWithSpinner(state.projectFolder)('git commit -m "feat: bootstrap application"', '[git] commit changes')];
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
var initializeCreateReactApp = function (state) { return __awaiter(_this$3, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, shell.execWithSpinner("npx create-react-app " + state.projectFolder + " --typescript", '[create react app] initialize')];
            case 1:
                _a.sent();
                return [4 /*yield*/, shell.execInProjectWithSpinner(state.projectFolder)("yarn remove @types/jest @types/node @types/react @types/react-dom && yarn add @types/jest @types/node @types/react @types/react-dom -D", '[dependencies] move @types to devDependencies')];
            case 2:
                _a.sent();
                return [4 /*yield*/, shell.execInProjectWithSpinner(state.projectFolder)("yarn add @types/webpack-env -D", '[dependencies] install @types/webpack-env')];
            case 3:
                _a.sent();
                return [4 /*yield*/, json.update('tsconfig.json')({
                        projectName: state.projectFolder,
                        message: '[json] adding baseUrl to tsconfig.json',
                        messageSuccess: '[json] add baseUrl to tsconfig.json',
                    }, function (jsonFile) {
                        jsonFile.compilerOptions.baseUrl = 'src';
                        return jsonFile;
                    })];
            case 4:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var addReadme = function (state) { return __awaiter(_this$3, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, shell.execInProject(state.projectFolder)('rm README.md')];
            case 1:
                _a.sent();
                return [4 /*yield*/, generator.runActions(state, 'README.md')];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var cleanPackageJson = function (state) {
    return json.update('package.json')({
        projectName: state.projectFolder,
        message: '[json] cleaning package.json',
        messageSuccess: '[json] clean package.json',
    }, function (jsonFile) {
        delete jsonFile.private;
        delete jsonFile.browserslist;
        delete jsonFile.eslintConfig;
        delete jsonFile.scripts.eject;
        return jsonFile;
    });
};
var addEditorConfig = function (state) {
    return generator.runActions(state, '.editorconfig');
};
var addBrowsersList = function (state) {
    return generator.runActions(state, '.browserslistrc');
};
var addPrettier = function (state) { return __awaiter(_this$3, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, json.update('package.json')({
                    projectName: state.projectFolder,
                    message: '[json] adding "format" to scripts',
                    messageSuccess: '[json] add "format" to scripts',
                }, function (jsonFile) {
                    jsonFile.scripts.format = "prettier --write '*/**/*.{ts,tsx,css,md,json}'";
                    return jsonFile;
                })];
            case 1:
                _a.sent();
                return [4 /*yield*/, shell.execInProjectWithSpinner(state.projectFolder)('yarn add prettier -D', '[dependencies] install prettier')];
            case 2:
                _a.sent();
                return [4 /*yield*/, generator.runActions(state, '.prettierrc')];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var addStyleLint = function (state) { return __awaiter(_this$3, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, json.update('package.json')({
                    projectName: state.projectFolder,
                    message: '[json] adding lint:css to scripts',
                    messageSuccess: '[json] add "lint:css" to scripts',
                }, function (jsonFile) {
                    jsonFile.scripts['lint:css'] = "stylelint 'src/**/*.{ts,tsx}'";
                    return jsonFile;
                })];
            case 1:
                _a.sent();
                return [4 /*yield*/, shell.execInProjectWithSpinner(state.projectFolder)('yarn add stylelint @strv/stylelint-config-styled-components stylelint-config-prettier -D', '[dependencies] install stylelint')];
            case 2:
                _a.sent();
                return [4 /*yield*/, generator.runActions(state, '.stylelintrc')];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var addEslint = function (state) { return __awaiter(_this$3, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, json.update('package.json')({
                    projectName: state.projectFolder,
                    message: '[json] adding "lint:ts" to scripts',
                    messageSuccess: '[json] add "lint:ts" to scripts',
                }, function (jsonFile) {
                    jsonFile.scripts['lint:ts'] = "eslint 'src/**/*.{ts,tsx}'";
                    return jsonFile;
                })];
            case 1:
                _a.sent();
                return [4 /*yield*/, shell.execInProjectWithSpinner(state.projectFolder)('yarn add eslint @strv/eslint-config-react @strv/eslint-config-typescript @strv/stylelint-config-styled-components @typescript-eslint/parser eslint-config-prettier eslint-plugin-react-hooks -D', '[dependencies] install eslint')];
            case 2:
                _a.sent();
                return [4 /*yield*/, generator.runActions(state, '.eslintrc.js')];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var addGitHooks = function (state) { return __awaiter(_this$3, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, shell.execInProjectWithSpinner(state.projectFolder)('yarn add husky lint-staged @commitlint/cli @commitlint/config-conventional -D', '[dependencies] install husky, lint-staged, commitlint')];
            case 1:
                _a.sent();
                return [4 /*yield*/, generator.runActions(state, 'commitlint.config.js')];
            case 2:
                _a.sent();
                return [4 /*yield*/, generator.runActions(state, '.huskyrc')];
            case 3:
                _a.sent();
                return [4 /*yield*/, generator.runActions(state, '.lintstagedrc')];
            case 4:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var addBasicProjectFiles = function (state) { return __awaiter(_this$3, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, shell.execInProjectWithSpinner(state.projectFolder)('rm -r src/*', '[fs] remove old project structure')];
            case 1:
                _a.sent();
                return [4 /*yield*/, shell.execInProjectWithSpinner(state.projectFolder)('yarn add styled-components && yarn add @types/styled-components jest-styled-components @testing-library/react -D', '[dependencies] install styled-components, jest, @testing-library/react')];
            case 2:
                _a.sent();
                return [4 /*yield*/, generator.runActions(state, '.env')];
            case 3:
                _a.sent();
                return [4 /*yield*/, generator.runActions(state, 'src')];
            case 4:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var addReactRouter = function (state) { return __awaiter(_this$3, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, shell.execInProjectWithSpinner(state.projectFolder)('yarn add react-router react-router-dom && yarn add @types/react-router-dom -D', '[dependencies] install react-router')];
            case 1:
                _a.sent();
                return [4 /*yield*/, generator.runActions(state, 'router')];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var addRedux = function (state) { return __awaiter(_this$3, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, shell.execInProjectWithSpinner(state.projectFolder)('yarn add redux react-redux && yarn add @types/redux @types/react-redux -D', '[dependencies] install redux')];
            case 1:
                _a.sent();
                return [4 /*yield*/, generator.runActions(state, 'redux')];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var addApollo = function (state) { return __awaiter(_this$3, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, shell.execInProjectWithSpinner(state.projectFolder)('yarn add apollo-boost react-apollo graphql', '[dependencies] install react-apollo, graphql')];
            case 1:
                _a.sent();
                return [4 /*yield*/, generator.runActions(state, 'apollo')];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var addDocker = function (state) {
    return generator.runActions(state, 'docker');
};
var addCircleCiConfig = function (state) {
    return generator.runActions(state, 'circleci');
};
var addHerokuConfig = function (state) { return __awaiter(_this$3, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, shell.execInProjectWithSpinner(state.projectFolder)('yarn add serve', '[dependencies] install serve')];
            case 1:
                _a.sent();
                return [4 /*yield*/, json.update('package.json')({
                        projectName: state.projectFolder,
                        message: '[json] adding scripts for integration with Heroku',
                        messageSuccess: '[json] add "prod" and "heroku-postbuild" scripts',
                    }, function (jsonFile) {
                        jsonFile.scripts.prod = 'node node_modules/.bin/serve -s build';
                        jsonFile.scripts['heroku-postbuild'] = 'npm run build';
                        return jsonFile;
                    })];
            case 2:
                _a.sent();
                return [4 /*yield*/, generator.runActions(state, 'heroku')];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };

var validateProjectFolder = function (value) {
    var validateName = require('validate-npm-package-name');
    var errors = validateName(value).errors;
    if (errors) {
        return 'Invalid name.';
    }
    if (fs.existsSync(path.resolve(value))) {
        return 'Project with this name already exists.';
    }
    return true;
};
var validator = {
    validateProjectFolder: validateProjectFolder,
};

var _this$4 = undefined;
var main = function () { return __awaiter(_this$4, void 0, void 0, function () {
    var rawProjectFolder, projectFolder, projectName, isRouter, stateManagementType, isDocker, ciService, cdService, generatorState;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logger.info("This app generator is built on top of Create React App (" + chalk.blue('https://github.com/facebook/create-react-app') + ".");
                return [4 /*yield*/, inquirer.prompt({
                        name: 'projectFolder',
                        message: 'How do you want to call your project?',
                        validate: validator.validateProjectFolder,
                    })];
            case 1:
                rawProjectFolder = (_a.sent()).projectFolder;
                projectFolder = rawProjectFolder.toLowerCase();
                projectName = words.toCapitalized(rawProjectFolder);
                return [4 /*yield*/, inquirer.prompt({
                        name: 'isRouter',
                        type: 'list',
                        message: 'Dou you want to install react-router?',
                        choices: [{ name: 'yes', value: true }, { name: 'no', value: false }],
                    })
                    // 3. Optional Data Flow
                ];
            case 2:
                isRouter = (_a.sent()).isRouter;
                return [4 /*yield*/, inquirer.prompt({
                        name: 'stateManagementType',
                        type: 'list',
                        message: 'What library do you want to use to manage state?',
                        choices: [
                            { name: 'Redux', value: 'redux' },
                            { name: 'Apollo GraphQL', value: 'apollo' },
                            { name: 'none 🚫', value: 'none' },
                        ],
                    })
                    // 4. Optional Docker
                ];
            case 3:
                stateManagementType = (_a.sent()).stateManagementType;
                return [4 /*yield*/, inquirer.prompt({
                        name: 'isDocker',
                        type: 'list',
                        message: 'Do you want to use docker 🐳?',
                        choices: [{ name: 'yes', value: true }, { name: 'no', value: false }],
                    })
                    // 5. CI
                ];
            case 4:
                isDocker = (_a.sent()).isDocker;
                return [4 /*yield*/, inquirer.prompt({
                        name: 'ciService',
                        type: 'list',
                        message: 'What CI service do you want to use?',
                        choices: [
                            { name: 'CircleCi', value: 'circleCi' },
                            { name: 'none 🚫', value: 'none' },
                        ],
                    })
                    // 6. CD
                ];
            case 5:
                ciService = (_a.sent()).ciService;
                return [4 /*yield*/, inquirer.prompt({
                        name: 'cdService',
                        type: 'list',
                        message: 'What hosting service do you want to use?',
                        choices: [
                            { name: 'Heroku', value: 'heroku' },
                            { name: 'none 🚫', value: 'none' },
                        ],
                    })];
            case 6:
                cdService = (_a.sent()).cdService;
                generatorState = {
                    projectFolder: projectFolder,
                    projectName: projectName,
                    isDocker: isDocker,
                    isRouter: isRouter,
                    // TODO: Write handle bars helpers for better conditional rendering
                    isRedux: stateManagementType === 'redux',
                    isApollo: stateManagementType === 'apollo',
                    isHeroku: cdService === 'heroku',
                };
                return [4 /*yield*/, checkYarn()];
            case 7:
                _a.sent();
                return [4 /*yield*/, checkNpx()];
            case 8:
                _a.sent();
                return [4 /*yield*/, initializeCreateReactApp(generatorState)];
            case 9:
                _a.sent();
                return [4 /*yield*/, cleanPackageJson(generatorState)];
            case 10:
                _a.sent();
                return [4 /*yield*/, addReadme(generatorState)];
            case 11:
                _a.sent();
                if (!(ciService === 'circleCi')) return [3 /*break*/, 13];
                return [4 /*yield*/, addCircleCiConfig(generatorState)];
            case 12:
                _a.sent();
                _a.label = 13;
            case 13:
                if (!(cdService === 'heroku')) return [3 /*break*/, 15];
                return [4 /*yield*/, addHerokuConfig(generatorState)];
            case 14:
                _a.sent();
                _a.label = 15;
            case 15:
                if (!isDocker) return [3 /*break*/, 17];
                return [4 /*yield*/, addDocker(generatorState)];
            case 16:
                _a.sent();
                _a.label = 17;
            case 17: return [4 /*yield*/, addEditorConfig(generatorState)];
            case 18:
                _a.sent();
                return [4 /*yield*/, addBrowsersList(generatorState)];
            case 19:
                _a.sent();
                return [4 /*yield*/, addPrettier(generatorState)];
            case 20:
                _a.sent();
                return [4 /*yield*/, addStyleLint(generatorState)];
            case 21:
                _a.sent();
                return [4 /*yield*/, addEslint(generatorState)];
            case 22:
                _a.sent();
                return [4 /*yield*/, addGitHooks(generatorState)];
            case 23:
                _a.sent();
                return [4 /*yield*/, addBasicProjectFiles(generatorState)];
            case 24:
                _a.sent();
                if (!isRouter) return [3 /*break*/, 26];
                return [4 /*yield*/, addReactRouter(generatorState)];
            case 25:
                _a.sent();
                _a.label = 26;
            case 26:
                if (!(stateManagementType === 'redux')) return [3 /*break*/, 28];
                return [4 /*yield*/, addRedux(generatorState)];
            case 27:
                _a.sent();
                _a.label = 28;
            case 28:
                if (!(stateManagementType === 'apollo')) return [3 /*break*/, 30];
                return [4 /*yield*/, addApollo(generatorState)];
            case 29:
                _a.sent();
                _a.label = 30;
            case 30: return [4 /*yield*/, addFilesToGit(generatorState)];
            case 31:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
main();
