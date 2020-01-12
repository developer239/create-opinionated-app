/* eslint-disable */
import chalk from 'chalk';
var logInfo = console.log;
export var logger = {
    info: logInfo,
    // eslint-disable-next-line no-irregular-whitespace
    warning: function (message) { return console.log("\u00A0\u00A0" + chalk.red(message)); },
};
