export var capitalize = function (word) {
    return word.charAt(0).toUpperCase() + word.substring(1);
};
export var capitalizeAll = function (name) {
    var _a;
    var words = (_a = name.match(/[A-Za-z][a-z]*/gu), (_a !== null && _a !== void 0 ? _a : []));
    return words.map(capitalize).join(' ');
};
export var toAlphaNumeric = function (name) {
    return name.replace(/\W/gu, '');
};
