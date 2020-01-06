#!/usr/bin/env node
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var inquirer = require('inquirer');
var chalk = require('chalk');
var chalk__default = _interopDefault(chalk);
var fs = _interopDefault(require('fs'));
var path = _interopDefault(require('path'));
var ora = _interopDefault(require('ora'));
var Handlebars = _interopDefault(require('handlebars'));
var R = require('ramda');
var ensureDirectory = _interopDefault(require('ensure-directory'));
var childProcess = _interopDefault(require('child_process'));
var shelljs = _interopDefault(require('shelljs'));

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

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

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

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

var capitalize = function (word) {
    return word.charAt(0).toUpperCase() + word.substring(1);
};
var capitalizeAll = function (name) {
    var _a;
    var words = (_a = name.match(/[A-Za-z][a-z]*/gu), (_a !== null && _a !== void 0 ? _a : []));
    return words.map(capitalize).join(' ');
};
var toAlphaNumeric = function (name) {
    return name.replace(/\W/gu, '');
};

var validateProjectFolder = function (value) {
    // eslint-disable-next-line
    var validateName = require('validate-npm-package-name');
    var errors = validateName(value).errors;
    if (errors) {
        return 'Invalid name.';
    }
    if (fs.existsSync(path.resolve(value.toLowerCase()))) {
        return 'Project with this name already exists.';
    }
    return true;
};
var validator = {
    validateProjectFolder: validateProjectFolder,
};

var state = {};

var loadTemplate = function (sourcePath) {
    return fs.readFileSync(path.join.apply(path, __spreadArrays([__dirname, 'generators'], sourcePath)), 'utf8');
};
var saveTemplate = function (destinationPath, data) { return __awaiter(void 0, void 0, void 0, function () {
    var projectFolder, fileFolder, targetFolder;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                projectFolder = process.cwd() + "/" + state.projectFolder;
                fileFolder = R.join('/', R.init(destinationPath));
                targetFolder = projectFolder + "/" + fileFolder;
                return [4 /*yield*/, ensureDirectory(targetFolder)];
            case 1:
                _a.sent();
                fs.writeFileSync(path.join(projectFolder, path.join.apply(path, destinationPath)), data);
                return [2 /*return*/];
        }
    });
}); };

var generate = function (_a) {
    var name = _a.name, templateFiles = _a.templateFiles;
    return __awaiter(void 0, void 0, void 0, function () {
        var spinner, _i, templateFiles_1, templateFile, compileTemplate, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    spinner = ora();
                    spinner.start("[generator] running " + name);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, , 7]);
                    _i = 0, templateFiles_1 = templateFiles;
                    _b.label = 2;
                case 2:
                    if (!(_i < templateFiles_1.length)) return [3 /*break*/, 5];
                    templateFile = templateFiles_1[_i];
                    compileTemplate = Handlebars.compile(templateFile.data);
                    // eslint-disable-next-line no-await-in-loop
                    return [4 /*yield*/, saveTemplate(templateFile.destination, compileTemplate(templateFile.context))];
                case 3:
                    // eslint-disable-next-line no-await-in-loop
                    _b.sent();
                    _b.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5:
                    spinner.succeed("[generator] create " + name);
                    return [3 /*break*/, 7];
                case 6:
                    error_1 = _b.sent();
                    spinner.warn("[generator] " + name + " error: " + error_1);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
};

var moduleName = 'browserslist';
var addBrowserlist = function () {
    return generate({
        name: moduleName,
        templateFiles: [
            {
                name: 'browserslistrc',
                data: loadTemplate([moduleName, 'templates', 'browserslistrc.hbs']),
                destination: ['.browserslistrc'],
            },
        ],
    });
};

/* eslint-disable */
var logInfo = console.log;
var logger = {
    info: logInfo,
    // eslint-disable-next-line no-irregular-whitespace
    warning: function (message) { return console.log("\u00A0\u00A0" + chalk__default.red(message)); },
};

var ProjectType;
(function (ProjectType) {
    ProjectType[ProjectType["CRA"] = 0] = "CRA";
    ProjectType[ProjectType["NEXT"] = 1] = "NEXT";
    ProjectType[ProjectType["RN"] = 2] = "RN";
})(ProjectType || (ProjectType = {}));

var moduleName$1 = 'docker';
var addDocker = function () {
    if (state.projectType !== ProjectType.CRA) {
        return logger.warning('[generator] skipped (docker not supported)');
    }
    return generate({
        name: moduleName$1,
        templateFiles: [
            {
                name: 'Dockerfile',
                data: loadTemplate([moduleName$1, 'templates', 'create-react-app', 'Dockerfile.hbs']),
                destination: ['Dockerfile'],
            },
            {
                name: 'docker-compose.yml',
                data: loadTemplate([moduleName$1, 'templates', 'create-react-app', 'docker-compose.yml.hbs']),
                destination: ['docker-compose.yml'],
                context: {
                    projectFolder: state.projectFolder,
                },
            },
        ],
    });
};

// https://stackoverflow.com/questions/46354368/how-to-have-cli-spinner-run-during-shelljs-command-exec
var runLongExec = function (command) {
    return new Promise(function (resolve, reject) {
        var spawnedProcess = childProcess.spawn(command, { shell: true });
        spawnedProcess.on('exit', resolve);
        spawnedProcess.on('error', reject);
    });
};
var execWithSpinner = function (command, successMessage, options) { return __awaiter(void 0, void 0, void 0, function () {
    var spinner, response;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                spinner = ora();
                spinner.start("Running: " + chalk__default.yellow(((_a = options) === null || _a === void 0 ? void 0 : _a.trim) ? command.replace(options.trim, '') : command));
                return [4 /*yield*/, runLongExec(command)];
            case 1:
                response = _b.sent();
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

var update = function (fileName) { return function (_a, updateFile) {
    var projectName = _a.projectName, message = _a.message, messageSuccess = _a.messageSuccess;
    return __awaiter(void 0, void 0, void 0, function () {
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

var moduleName$2 = 'reactapp';
var initReactApp = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, shell.execWithSpinner("npx create-react-app " + state.projectFolder + " --typescript", '[create react app] initialize')];
            case 1:
                _a.sent();
                return [4 /*yield*/, shell.execInProjectWithSpinner(state.projectFolder)('yarn remove @types/jest @types/node @types/react @types/react-dom && yarn add @types/jest @types/node @types/react @types/react-dom -D', '[dependencies] move @types to devDependencies')];
            case 2:
                _a.sent();
                return [4 /*yield*/, shell.execInProjectWithSpinner(state.projectFolder)('yarn add @types/webpack-env -D', '[dependencies] install @types/webpack-env')];
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

var addRouter = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, shell.execInProjectWithSpinner(state.projectFolder)('yarn add react-router react-router-dom && yarn add @types/react-router-dom -D', '[dependencies] install react-router')];
            case 1:
                _a.sent();
                return [4 /*yield*/, generate({
                        name: moduleName$2 + "/router",
                        templateFiles: [
                            {
                                name: 'pages/Home',
                                data: loadTemplate([moduleName$2, 'templates', 'router', 'pages', 'Home', 'index.tsx.hbs']),
                                destination: ['src', 'pages', 'Home', 'index.tsx'],
                                context: { projectName: state.projectName },
                            },
                            {
                                name: 'pages/Home/test',
                                data: loadTemplate([moduleName$2, 'templates', 'router', 'pages', 'Home', 'test', 'Home.test.tsx.hbs']),
                                destination: ['src', 'pages', 'Home', 'test', 'Home.test.tsx'],
                            },
                            {
                                name: 'pages/NotFound',
                                data: loadTemplate([moduleName$2, 'templates', 'router', 'pages', 'NotFound', 'index.tsx.hbs']),
                                destination: ['src', 'pages', 'NotFound', 'index.tsx'],
                            },
                            {
                                name: 'pages/NotFound/test',
                                data: loadTemplate([moduleName$2, 'templates', 'router', 'pages', 'NotFound', 'test', 'NotFound.test.tsx.hbs']),
                                destination: ['src', 'pages', 'NotFound', 'test', 'NotFound.test.tsx'],
                            },
                            {
                                name: 'testUtils/render',
                                data: loadTemplate([moduleName$2, 'templates', 'router', 'testUtils', 'render.tsx.hbs']),
                                destination: ['src', 'testUtils', 'render.tsx'],
                            },
                        ],
                    })];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };

var addRedux = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, shell.execInProjectWithSpinner(state.projectFolder)('yarn add redux react-redux && yarn add @types/redux @types/react-redux -D', '[dependencies] install redux')];
            case 1:
                _a.sent();
                return [4 /*yield*/, generate({
                        name: moduleName$2 + "/state",
                        templateFiles: [
                            {
                                name: 'index.ts',
                                data: loadTemplate([moduleName$2, 'templates', 'redux', 'index.ts.hbs']),
                                destination: ['src', 'store', 'index.ts'],
                            },
                            {
                                name: 'reducer.ts',
                                data: loadTemplate([moduleName$2, 'templates', 'redux', 'reducer.ts.hbs']),
                                destination: ['src', 'store', 'reducer.ts'],
                            },
                        ],
                    })];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var addApollo = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, shell.execInProjectWithSpinner(state.projectFolder)('yarn add apollo-boost react-apollo graphql', '[dependencies] install react-apollo, graphql')];
            case 1:
                _a.sent();
                return [4 /*yield*/, generate({
                        name: moduleName$2 + "/state",
                        templateFiles: [
                            {
                                name: 'apolloClient.ts',
                                data: loadTemplate([moduleName$2, 'templates', 'apollo', 'apolloClient.ts.hbs']),
                                destination: ['src', 'apolloClient.ts'],
                            },
                        ],
                    })];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };

var cleanPackageJson = function () {
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

var addReadme = function (context) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                shell.execInProject(state.projectFolder)('rm README.md');
                return [4 /*yield*/, generate({
                        name: moduleName$2 + "/readme",
                        templateFiles: [
                            {
                                name: 'README.md',
                                data: loadTemplate([moduleName$2, 'templates', 'README.md.hbs']),
                                destination: ['README.md'],
                                context: {
                                    projectFolder: state.projectFolder,
                                    projectName: state.projectName,
                                    isDocker: context.isDocker,
                                    isHeroku: context.isHeroku,
                                },
                            },
                        ],
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };

var moduleName$3 = 'heroku';
var addHeroku = function () {
    if (state.projectType === ProjectType.RN || state.projectType === ProjectType.NEXT) {
        return logger.warning('[generator] skipped (heroku not supported)');
    }
    return generate({
        name: moduleName$3,
        templateFiles: [
            {
                name: 'Procfile',
                data: loadTemplate([moduleName$3, 'templates', 'create-react-app', 'Procfile.hbs']),
                destination: ['Procfile'],
            },
        ],
    });
};

var moduleName$4 = 'editorconfig';
var addEditorconfig = function () {
    return generate({
        name: moduleName$4,
        templateFiles: [
            {
                name: 'editorconfig',
                data: loadTemplate([moduleName$4, 'templates', 'editorconfig.hbs']),
                destination: ['.editorconfig'],
            },
        ],
    });
};

var moduleName$5 = 'gitHooks';
var setUpGitHooks = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, shell.execInProjectWithSpinner(state.projectFolder)('yarn add husky lint-staged @commitlint/cli @code-quality/commitlint-config -D', '[dependencies] install husky, lint-staged, commitlint')];
            case 1:
                _a.sent();
                return [4 /*yield*/, generate({
                        name: moduleName$5,
                        templateFiles: [
                            {
                                name: 'commitlint.config.js',
                                data: loadTemplate([moduleName$5, 'templates', 'commitlint.config.js.hbs']),
                                destination: ['commitlint.config.js'],
                            },
                            {
                                name: 'huskyrc',
                                data: loadTemplate([moduleName$5, 'templates', 'huskyrc.hbs']),
                                destination: ['.huskyrc'],
                            },
                            {
                                name: 'lintstagedrc',
                                data: loadTemplate([moduleName$5, 'templates', 'lintstagedrc.hbs']),
                                destination: ['.lintstagedrc'],
                            },
                        ],
                    })];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };

var replaceSourceFiles = function (context) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, shell.execInProjectWithSpinner(state.projectFolder)('rm -r src/*', '[fs] remove old project structure')];
            case 1:
                _a.sent();
                return [4 /*yield*/, shell.execInProjectWithSpinner(state.projectFolder)('yarn add styled-components && yarn add @types/styled-components jest-styled-components @testing-library/react -D', '[dependencies] install styled-components, jest, @testing-library/react')];
            case 2:
                _a.sent();
                return [4 /*yield*/, generate({
                        name: moduleName$2,
                        templateFiles: [
                            {
                                name: 'env',
                                data: loadTemplate([moduleName$2, 'templates', 'srcFiles', 'env.hbs']),
                                destination: ['.env'],
                            },
                            {
                                name: 'setupTests.ts',
                                data: loadTemplate([moduleName$2, 'templates', 'srcFiles', 'src', 'setupTests.ts.hbs']),
                                destination: ['src', 'setupTests.ts'],
                            },
                            {
                                name: 'react-app-env.d.ts',
                                data: loadTemplate([moduleName$2, 'templates', 'srcFiles', 'src', 'react-app-env.d.ts.hbs']),
                                destination: ['src', 'react-app-env.d.ts'],
                            },
                            {
                                name: 'index.tsx',
                                data: loadTemplate([moduleName$2, 'templates', 'srcFiles', 'src', 'index.tsx.hbs']),
                                destination: ['src', 'index.tsx'],
                                context: __assign(__assign({}, context), { projectName: state.projectName }),
                            },
                            {
                                name: 'App.tsx',
                                data: loadTemplate([moduleName$2, 'templates', 'srcFiles', 'src', 'App.tsx.hbs']),
                                destination: ['src', 'App.tsx'],
                                context: __assign(__assign({}, context), { projectName: state.projectName }),
                            },
                            {
                                name: 'components/Layout',
                                data: loadTemplate([moduleName$2, 'templates', 'srcFiles', 'src', 'components', 'Layout', 'index.ts.hbs']),
                                destination: ['src', 'components', 'Layout', 'index.ts'],
                            },
                        ],
                    })];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };

var addFilesToGit = function () { return __awaiter(void 0, void 0, void 0, function () {
    var code;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = shell.exec('git --version').code;
                if (code !== 0) {
                    return [2 /*return*/, logger.warning('git not found. skipping this step')];
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

var moduleName$6 = 'prettier';
var addPrettier = function () { return __awaiter(void 0, void 0, void 0, function () {
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
                return [4 /*yield*/, shell.execInProjectWithSpinner(state.projectFolder)('yarn add prettier @code-quality/prettier-config -D', '[dependencies] install prettier')];
            case 2:
                _a.sent();
                return [4 /*yield*/, generate({
                        name: moduleName$6,
                        templateFiles: [
                            {
                                name: 'prettierrc.js',
                                data: loadTemplate([moduleName$6, 'templates', 'prettierrc.js.hbs']),
                                destination: ['.prettierrc.js'],
                            },
                        ],
                    })];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };

var moduleName$7 = 'stylelint';
var addForMobile = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, shell.execInProjectWithSpinner(state.projectFolder)('yarn add stylelint prettier @code-quality/stylelint-styled-components-react-native-config stylelint-config-prettier -D', '[dependencies] install stylelint')];
            case 1:
                _a.sent();
                return [2 /*return*/, generate({
                        name: 'stylelintrc.js',
                        templateFiles: [
                            {
                                name: 'stylelintrc.js',
                                data: loadTemplate([moduleName$7, 'templates', 'mobile', 'stylelintrc.js.hbs']),
                                destination: ['.stylelintrc.js'],
                            },
                        ],
                    })];
        }
    });
}); };
var addForWeb = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, shell.execInProjectWithSpinner(state.projectFolder)('yarn add stylelint prettier @code-quality/stylelint-styled-components-config stylelint-config-prettier -D', '[dependencies] install stylelint')];
            case 1:
                _a.sent();
                return [2 /*return*/, generate({
                        name: 'stylelintrc.js',
                        templateFiles: [
                            {
                                name: 'stylelintrc.js',
                                data: loadTemplate([moduleName$7, 'templates', 'web', 'stylelintrc.js.hbs']),
                                destination: ['.stylelintrc.js'],
                            },
                        ],
                    })];
        }
    });
}); };
var addStylelint = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, json.update('package.json')({
                    projectName: state.projectFolder,
                    message: '[json] adding lint:css to scripts',
                    messageSuccess: '[json] add "lint:css" to scripts',
                }, function (jsonFile) {
                    jsonFile.scripts['lint:css'] = state.projectType === ProjectType.NEXT ? "stylelint 'pages/**/*.{ts,tsx}'" : "stylelint '**/*.{ts,tsx}'";
                    return jsonFile;
                })];
            case 1:
                _a.sent();
                if (!(state.projectType === ProjectType.RN)) return [3 /*break*/, 3];
                return [4 /*yield*/, addForMobile()];
            case 2:
                _a.sent();
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, addForWeb()];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); };

var moduleName$8 = 'eslint';
var addForMobile$1 = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, shell.execInProjectWithSpinner(state.projectFolder)('yarn add eslint eslint-plugin-import @code-quality/eslint-config-react-native @code-quality/eslint-config-typescript eslint-config-prettier -D', '[dependencies] install eslint')];
            case 1:
                _a.sent();
                return [2 /*return*/, generate({
                        name: moduleName$8,
                        templateFiles: [
                            {
                                name: 'eslintrc.js',
                                data: loadTemplate([moduleName$8, 'templates', 'mobile', 'eslintrc.js.hbs']),
                                destination: ['.eslintrc.js'],
                            },
                        ],
                    })];
        }
    });
}); };
var addForWb = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, shell.execInProjectWithSpinner(state.projectFolder)('yarn add eslint eslint-plugin-import @code-quality/eslint-config-react @code-quality/eslint-config-typescript eslint-config-prettier -D', '[dependencies] install eslint')];
            case 1:
                _a.sent();
                return [2 /*return*/, generate({
                        name: moduleName$8,
                        templateFiles: [
                            {
                                name: 'eslintrc.js',
                                data: loadTemplate([moduleName$8, 'templates', 'web', 'eslintrc.js.hbs']),
                                destination: ['.eslintrc.js'],
                            },
                        ],
                    })];
        }
    });
}); };
var addEslint = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, json.update('package.json')({
                    projectName: state.projectFolder,
                    message: '[json] adding "lint:ts" to scripts',
                    messageSuccess: '[json] add "lint:ts" to scripts',
                }, function (jsonFile) {
                    jsonFile.scripts['lint:ts'] = state.projectType === ProjectType.NEXT ? 'eslint --ext .ts,.tsx pages' : 'eslint --ext .ts,.tsx src';
                    return jsonFile;
                })];
            case 1:
                _a.sent();
                if (!(state.projectType === ProjectType.RN)) return [3 /*break*/, 3];
                return [4 /*yield*/, addForMobile$1()];
            case 2:
                _a.sent();
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, addForWb()];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); };

// eslint-disable-next-line max-lines-per-function
var createReactApp = function () { return __awaiter(void 0, void 0, void 0, function () {
    var isRouter, stateManagement, isDocker, cdService;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, inquirer.prompt({
                    name: 'isRouter',
                    type: 'list',
                    message: 'Do you want to use router?',
                    choices: [{ name: 'no', value: false }, { name: 'yes', value: true }],
                })];
            case 1:
                isRouter = (_a.sent()).isRouter;
                return [4 /*yield*/, inquirer.prompt({
                        name: 'stateManagement',
                        type: 'list',
                        message: 'What library do you want to use to manage state?',
                        choices: [
                            { name: 'none', value: 'none' },
                            { name: 'Apollo GraphQL', value: 'apollo' },
                            { name: 'Redux', value: 'redux' },
                        ],
                    })];
            case 2:
                stateManagement = (_a.sent()).stateManagement;
                return [4 /*yield*/, inquirer.prompt({
                        name: 'isDocker',
                        type: 'list',
                        message: 'Do you want to use docker 🐳?',
                        choices: [{ name: 'no', value: false }, { name: 'yes', value: true }],
                    })];
            case 3:
                isDocker = (_a.sent()).isDocker;
                return [4 /*yield*/, inquirer.prompt({
                        name: 'cdService',
                        type: 'list',
                        message: 'What hosting service do you want to use?',
                        choices: [
                            { name: 'none 🚫', value: 'none' },
                            { name: 'Heroku', value: 'heroku' },
                        ],
                    })];
            case 4:
                cdService = (_a.sent()).cdService;
                return [4 /*yield*/, initReactApp()];
            case 5:
                _a.sent();
                return [4 /*yield*/, cleanPackageJson()];
            case 6:
                _a.sent();
                return [4 /*yield*/, addReadme({ isDocker: isDocker, isHeroku: cdService === 'heroku' })];
            case 7:
                _a.sent();
                if (!(cdService === 'heroku')) return [3 /*break*/, 9];
                return [4 /*yield*/, addHeroku()];
            case 8:
                _a.sent();
                _a.label = 9;
            case 9:
                if (!isDocker) return [3 /*break*/, 11];
                return [4 /*yield*/, addDocker()];
            case 10:
                _a.sent();
                _a.label = 11;
            case 11: return [4 /*yield*/, addEditorconfig()];
            case 12:
                _a.sent();
                return [4 /*yield*/, addBrowserlist()];
            case 13:
                _a.sent();
                return [4 /*yield*/, addPrettier()];
            case 14:
                _a.sent();
                return [4 /*yield*/, addStylelint()];
            case 15:
                _a.sent();
                return [4 /*yield*/, addEslint()];
            case 16:
                _a.sent();
                return [4 /*yield*/, setUpGitHooks()];
            case 17:
                _a.sent();
                return [4 /*yield*/, replaceSourceFiles({
                        isApollo: stateManagement === 'apollo',
                        isRedux: stateManagement === 'redux',
                        isRouter: isRouter,
                    })];
            case 18:
                _a.sent();
                if (!isRouter) return [3 /*break*/, 20];
                return [4 /*yield*/, addRouter()];
            case 19:
                _a.sent();
                _a.label = 20;
            case 20:
                if (!(stateManagement === 'redux')) return [3 /*break*/, 22];
                return [4 /*yield*/, addRedux()];
            case 21:
                _a.sent();
                _a.label = 22;
            case 22:
                if (!(stateManagement === 'apollo')) return [3 /*break*/, 24];
                return [4 /*yield*/, addApollo()];
            case 23:
                _a.sent();
                _a.label = 24;
            case 24: return [4 /*yield*/, addFilesToGit()];
            case 25:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };

var moduleName$9 = 'nextjsapp';
var initNextJsApp = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, shell.execWithSpinner("mkdir " + state.projectFolder, '[nextjs app] create project folder')];
            case 1:
                _a.sent();
                return [4 /*yield*/, generate({
                        name: moduleName$9,
                        templateFiles: [
                            {
                                name: 'package.json',
                                data: loadTemplate([moduleName$9, 'templates', 'package.json.hbs']),
                                destination: ['package.json'],
                                context: {
                                    projectFolder: state.projectFolder,
                                },
                            },
                            {
                                name: 'babelrc',
                                data: loadTemplate([moduleName$9, 'templates', 'babelrc.hbs']),
                                destination: ['.babelrc'],
                            },
                            {
                                name: 'gitignore',
                                data: loadTemplate([moduleName$9, 'templates', 'gitignore.hbs']),
                                destination: ['.gitignore'],
                            },
                            {
                                name: 'README.md',
                                data: loadTemplate([moduleName$9, 'templates', 'README.md.hbs']),
                                destination: ['README.md'],
                                context: {
                                    projectName: state.projectName,
                                },
                            },
                            {
                                name: 'next-env.d.ts',
                                data: loadTemplate([moduleName$9, 'templates', 'next-env.d.ts.hbs']),
                                destination: ['next-env.d.ts'],
                            },
                            {
                                name: 'tsconfig.json',
                                data: loadTemplate([moduleName$9, 'templates', 'tsconfig.json.hbs']),
                                destination: ['tsconfig.json'],
                            },
                            {
                                name: '_document.tsx',
                                data: loadTemplate([moduleName$9, 'templates', 'pages', '_document.tsx.hbs']),
                                destination: ['pages', '_document.tsx'],
                            },
                            {
                                name: 'index.tsx',
                                data: loadTemplate([moduleName$9, 'templates', 'pages', 'index.tsx.hbs']),
                                destination: ['pages', 'index.tsx'],
                                context: {
                                    projectName: state.projectName,
                                },
                            },
                        ],
                    })];
            case 2:
                _a.sent();
                return [4 /*yield*/, shell.execInProjectWithSpinner(state.projectFolder)('yarn add next react react-dom styled-components', '[dependencies] install initial dependencies')];
            case 3:
                _a.sent();
                return [4 /*yield*/, shell.execInProjectWithSpinner(state.projectFolder)('yarn add @types/node @types/react @types/react-dom @types/styled-components babel-plugin-styled-components typescript -D', '[dependencies] install initial devDependencies')];
            case 4:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };

var createNextJsApp = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, initNextJsApp()];
            case 1:
                _a.sent();
                return [4 /*yield*/, addEditorconfig()];
            case 2:
                _a.sent();
                return [4 /*yield*/, addBrowserlist()];
            case 3:
                _a.sent();
                return [4 /*yield*/, addPrettier()];
            case 4:
                _a.sent();
                return [4 /*yield*/, addStylelint()];
            case 5:
                _a.sent();
                return [4 /*yield*/, addEslint()];
            case 6:
                _a.sent();
                return [4 /*yield*/, setUpGitHooks()];
            case 7:
                _a.sent();
                return [4 /*yield*/, addFilesToGit()];
            case 8:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };

var checkYarn = function () { return __awaiter(void 0, void 0, void 0, function () {
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

var checkNpx = function () { return __awaiter(void 0, void 0, void 0, function () {
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

var moduleName$a = 'reactnativeapp';
var initReactNativeApp = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, shell.execWithSpinner("npx react-native init " + state.projectFolder, '[react-native-app] initialized')];
            case 1:
                _a.sent();
                return [4 /*yield*/, shell.execInProjectWithSpinner(state.projectFolder)('rm .eslintrc.js .flowconfig .prettierrc.js App.js babel.config.js index.js', '[fs] remove unnecessary project files')];
            case 2:
                _a.sent();
                return [4 /*yield*/, json.update('package.json')({
                        projectName: state.projectFolder,
                        message: '[json] cleaning package.json',
                        messageSuccess: '[json] clean package.json',
                    }, function (jsonFile) {
                        jsonFile.scripts = {};
                        jsonFile.scripts.start = 'react-native start --reset-cache';
                        jsonFile.scripts['start:android'] = 'react-native run-android';
                        jsonFile.scripts['start:ios'] = 'react-native run-ios';
                        jsonFile.scripts.test = 'jest';
                        return jsonFile;
                    })];
            case 3:
                _a.sent();
                return [4 /*yield*/, shell.execInProjectWithSpinner(state.projectFolder)('yarn add styled-components', '[dependencies] install initial dependencies')];
            case 4:
                _a.sent();
                return [4 /*yield*/, shell.execInProjectWithSpinner(state.projectFolder)('yarn add typescript babel-plugin-inline-import metro-react-native-babel-preset @types/jest @types/react @types/react-native @types/react-test-renderer @testing-library/react-native @types/node @types/styled-components babel-plugin-module-resolver -D', '[dependencies] install initial devDependencies')];
            case 5:
                _a.sent();
                return [4 /*yield*/, generate({
                        name: moduleName$a,
                        templateFiles: [
                            {
                                name: 'jest.config.js',
                                data: loadTemplate([moduleName$a, 'templates', 'jest.config.js.hbs']),
                                destination: ['jest.config.js'],
                            },
                            {
                                name: 'tsconfig.json',
                                data: loadTemplate([moduleName$a, 'templates', 'tsconfig.json.hbs']),
                                destination: ['tsconfig.json'],
                            },
                            {
                                name: 'babel.config.js',
                                data: loadTemplate([moduleName$a, 'templates', 'babel.config.js.hbs']),
                                destination: ['babel.config.js'],
                            },
                            {
                                name: 'index.js',
                                data: loadTemplate([moduleName$a, 'templates', 'index.js.hbs']),
                                destination: ['index.js'],
                            },
                            {
                                name: 'App.tsx',
                                data: loadTemplate([moduleName$a, 'templates', 'src', 'App.tsx.hbs']),
                                destination: ['src', 'App.tsx'],
                            },
                        ],
                    })];
            case 6:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };

var createReactNativeApp = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, initReactNativeApp()];
            case 1:
                _a.sent();
                return [4 /*yield*/, addEditorconfig()];
            case 2:
                _a.sent();
                return [4 /*yield*/, addPrettier()];
            case 3:
                _a.sent();
                return [4 /*yield*/, addStylelint()];
            case 4:
                _a.sent();
                return [4 /*yield*/, addEslint()];
            case 5:
                _a.sent();
                return [4 /*yield*/, setUpGitHooks()];
            case 6:
                _a.sent();
                return [4 /*yield*/, addFilesToGit()];
            case 7:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };

var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var rawProjectFolder, projectType;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, inquirer.prompt({
                    name: 'projectFolder',
                    message: 'How do you want to call your project?',
                    validate: validator.validateProjectFolder,
                })];
            case 1:
                rawProjectFolder = (_a.sent()).projectFolder;
                state.projectFolder = rawProjectFolder.toLowerCase();
                state.projectName = capitalizeAll(rawProjectFolder);
                return [4 /*yield*/, inquirer.prompt({
                        name: 'projectType',
                        type: 'list',
                        message: 'What type of application would you like to create?',
                        choices: [
                            { name: 'Create React App', value: ProjectType.CRA },
                            { name: 'NextJs App', value: ProjectType.NEXT },
                            { name: 'React Native App', value: ProjectType.RN },
                        ],
                    })];
            case 2:
                projectType = (_a.sent()).projectType;
                state.projectType = projectType;
                if (projectType === ProjectType.RN) {
                    state.projectFolder = toAlphaNumeric(state.projectFolder);
                }
                return [4 /*yield*/, checkYarn()];
            case 3:
                _a.sent();
                return [4 /*yield*/, checkNpx()];
            case 4:
                _a.sent();
                if (!(projectType === ProjectType.CRA)) return [3 /*break*/, 6];
                return [4 /*yield*/, createReactApp()];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6:
                if (!(projectType === ProjectType.NEXT)) return [3 /*break*/, 8];
                return [4 /*yield*/, createNextJsApp()];
            case 7:
                _a.sent();
                _a.label = 8;
            case 8:
                if (!(projectType === ProjectType.RN)) return [3 /*break*/, 10];
                return [4 /*yield*/, createReactNativeApp()];
            case 9:
                _a.sent();
                _a.label = 10;
            case 10:
                logger.info(chalk.green(" _____ _   _ ______ _____  _____ _____ _____ \n/  ___| | | /  __ \\/  __ \\|  ___/  ___/  ___|\n\\ `--.| | | | /  \\/| /  \\/| |__ \\ `--.\\ `--. \n `--. \\ | | | |    | |    |  __| `--. \\`--. \\\n/\\__/ / |_| | \\__/\\| \\__/\\| |___/\\__/ /\\__/ /\n\\____/ \\___/ \\____/ \\____/\\____/\\____/\\____/ \n"));
                logger.info(chalk.bold("Your new application lives in " + chalk.underline.green("./" + state.projectFolder)));
                return [2 /*return*/];
        }
    });
}); };
main().catch(function () { return logger.info('failed to run generator'); });
