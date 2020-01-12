import { generate } from 'services/generator';
var moduleName = 'editorconfig';
export var addEditorconfig = function () {
    return generate({
        name: moduleName,
        source: 'templates',
        destination: '.',
    });
};
