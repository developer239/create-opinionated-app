import { generate } from 'services/generator';
var moduleName = 'browserslist';
export var addBrowserlist = function () {
    return generate({
        name: moduleName,
        source: 'templates',
        destination: '.',
    });
};
