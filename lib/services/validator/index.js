import fs from 'fs';
import path from 'path';
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
export var validator = {
    validateProjectFolder: validateProjectFolder,
};
