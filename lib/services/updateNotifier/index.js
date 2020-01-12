import path from 'path';
import updateNotifier from 'update-notifier';
export var checkUpdates = function () {
    // eslint-disable-next-line
    var pkg = require(path.join(__dirname, '../../../package.json'));
    updateNotifier({ pkg: pkg }).notify();
};
