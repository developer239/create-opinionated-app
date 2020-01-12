var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
};
import { prompt } from 'inquirer';
import { shell } from 'services/shell';
import { generate } from 'services/generator';
import { json } from 'services/json';
import { addDependencies, removeDependencies, removeFiles } from 'services/exec';
export var moduleName = '_ReactNative';
var NavigationType;
(function (NavigationType) {
    NavigationType["NONE"] = "NONE";
    NavigationType["WIX"] = "WIX";
    NavigationType["REACT_NAVIGATION"] = "REACT_NAVIGATION";
})(NavigationType || (NavigationType = {}));
export var initReactNativeApp = function (context) { return __awaiter(void 0, void 0, void 0, function () {
    var navigationType, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, prompt({
                    name: 'navigationType',
                    type: 'list',
                    message: 'Do you want to use navigation?',
                    choices: [
                        { name: 'None', value: NavigationType.NONE },
                        { name: 'React Native Navigation (WIX)', value: NavigationType.WIX },
                        { name: 'React Navigation', value: NavigationType.REACT_NAVIGATION },
                    ],
                })];
            case 1:
                navigationType = (_b.sent()).navigationType;
                return [4 /*yield*/, shell.execWithSpinner("npx react-native init " + context.projectFolder + " --version 0.61.5", '[react-native-app] initialized')];
            case 2:
                _b.sent();
                return [4 /*yield*/, removeFiles('default project files', [
                        '.eslintrc.js',
                        '.flowconfig',
                        '.prettierrc.js',
                        'App.js',
                        'babel.config.js',
                        'index.js',
                    ])];
            case 3:
                _b.sent();
                return [4 /*yield*/, removeFiles('__tests__', ['__tests__'], true)];
            case 4:
                _b.sent();
                return [4 /*yield*/, json.update('package.json')({
                        projectName: context.projectFolder,
                        message: '[json] cleaning package.json',
                        messageSuccess: '[json] clean package.json',
                    }, function (jsonFile) { return (__assign(__assign({}, jsonFile), { scripts: __assign(__assign({}, jsonFile.scripts), { 'start': 'react-native start --reset-cache', 'start:android': 'react-native run-android', 'start:ios': 'react-native run-ios', 'test': 'jest' }) })); })];
            case 5:
                _b.sent();
                return [4 /*yield*/, addDependencies('styled-components', ['styled-components'])];
            case 6:
                _b.sent();
                return [4 /*yield*/, addDependencies('types and test tools', [
                        'typescript',
                        'babel-plugin-inline-import',
                        'metro-react-native-babel-preset',
                        '@types/jest @types/react',
                        '@types/react-native',
                        '@types/react-test-renderer',
                        '@testing-library/react-native',
                        '@types/node @types/styled-components',
                        'babel-plugin-module-resolver',
                    ], true)];
            case 7:
                _b.sent();
                return [4 /*yield*/, removeDependencies('react-test-renderer', ['react-test-renderer', '@types/react-test-renderer'])];
            case 8:
                _b.sent();
                return [4 /*yield*/, addDependencies('react-native-config', ['react-native-config'])];
            case 9:
                _b.sent();
                return [4 /*yield*/, generate({
                        name: moduleName,
                        source: 'templates/base',
                        destination: '.',
                        context: { projectName: context.projectName },
                    })];
            case 10:
                _b.sent();
                _a = navigationType;
                switch (_a) {
                    case NavigationType.REACT_NAVIGATION: return [3 /*break*/, 11];
                    case NavigationType.WIX: return [3 /*break*/, 14];
                }
                return [3 /*break*/, 19];
            case 11: return [4 /*yield*/, addDependencies('react-navigation', ['react-navigation', 'react-native-reanimated', 'react-native-gesture-handler', 'react-native-screens', 'react-native-safe-area-context', 'react-navigation-stack', 'react-navigation-tabs'])];
            case 12:
                _b.sent();
                return [4 /*yield*/, generate({
                        name: moduleName,
                        source: 'templates/react-navigation',
                        destination: '.',
                        context: { projectName: context.projectName },
                    })];
            case 13:
                _b.sent();
                return [3 /*break*/, 19];
            case 14: return [4 /*yield*/, addDependencies('react-native-navigation', ['react-native-navigation'])];
            case 15:
                _b.sent();
                return [4 /*yield*/, generate({
                        name: moduleName,
                        source: 'templates/react-native-navigation',
                        destination: '.',
                        context: { projectName: context.projectName },
                    })];
            case 16:
                _b.sent();
                return [4 /*yield*/, generate({
                        name: moduleName,
                        source: 'templates/react-native-navigation-app-delegate-fix',
                        destination: "ios/" + context.projectFolder,
                        context: { projectName: context.projectName },
                    })];
            case 17:
                _b.sent();
                return [4 /*yield*/, generate({
                        name: moduleName,
                        source: 'templates/react-native-navigation-main-activity-fix',
                        destination: "android/app/src/main/java/com/" + context.projectFolder,
                        context: { projectName: context.projectName },
                    })];
            case 18:
                _b.sent();
                return [3 /*break*/, 19];
            case 19: return [4 /*yield*/, shell.execInProjectWithSpinner(context.projectFolder)('react-native link', '[exec] link RN dependencies')];
            case 20:
                _b.sent();
                return [4 /*yield*/, shell.execInProjectWithSpinner(context.projectFolder)('cd ios && pod install', '[exec] run pod install')];
            case 21:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
