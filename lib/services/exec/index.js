import { state } from '../../state';
import { shell } from '../shell';
export var addDependencies = function (name, libraries, isDev) {
    if (isDev === void 0) { isDev = false; }
    return shell.execInProjectWithSpinner(state.projectFolder)("yarn add " + libraries.join(' ') + " " + (isDev ? '-D' : ''), "[dependencies][add] " + name);
};
export var removeDependencies = function (name, libraries) {
    return shell.execInProjectWithSpinner(state.projectFolder)("yarn add " + libraries.join(' '), "[dependencies][remove] " + name);
};
export var moveToDevDependencies = function (name, libraries) {
    return shell.execInProjectWithSpinner(state.projectFolder)("yarn remove " + libraries.join(' ') + " && yarn add " + libraries.join(' ') + " -D", "[dependencies][move] " + name);
};
export var removeFiles = function (name, files, recursive) {
    if (recursive === void 0) { recursive = false; }
    return shell.execInProjectWithSpinner(state.projectFolder)("rm " + (recursive ? '-r' : '') + " " + files.join(' '), "[fs][remove files] " + name);
};
export var makeDir = function (name) {
    return shell.execWithSpinner("mkdir " + name, "[fs][make dir] " + name);
};
