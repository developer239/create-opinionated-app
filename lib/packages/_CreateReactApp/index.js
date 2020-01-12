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
import { json } from 'services/json';
import { addDependencies, moveToDevDependencies, removeFiles } from 'services/exec';
import { generate } from 'services/generator';
export var moduleName = '_CreateReactApp';
export var initReactApp = function (context) { return __awaiter(void 0, void 0, void 0, function () {
    var isRouter;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prompt({
                    name: 'isRouter',
                    type: 'list',
                    message: 'Do you want to use react-router?',
                    choices: [
                        { name: 'No', value: false },
                        { name: 'Yes', value: true },
                    ],
                })];
            case 1:
                isRouter = (_a.sent()).isRouter;
                return [4 /*yield*/, shell.execWithSpinner("npx create-react-app " + context.projectFolder + " --template typescript", '[create react app] initialize')];
            case 2:
                _a.sent();
                return [4 /*yield*/, removeFiles('old project structure', ['src/*'], true)];
            case 3:
                _a.sent();
                return [4 /*yield*/, moveToDevDependencies('@types to devDependencies', ['@types/jest', '@types/node', '@types/react', '@types/react-dom'])];
            case 4:
                _a.sent();
                return [4 /*yield*/, addDependencies('install @types/webpack-env', ['@types/webpack-env'], true)];
            case 5:
                _a.sent();
                return [4 /*yield*/, addDependencies('styled-components', ['styled-components'])];
            case 6:
                _a.sent();
                return [4 /*yield*/, addDependencies('css reset', ['sanitize.css'])];
            case 7:
                _a.sent();
                return [4 /*yield*/, addDependencies('@types and testing libraries', ['@types/styled-components', 'jest-styled-components'], true)];
            case 8:
                _a.sent();
                return [4 /*yield*/, moveToDevDependencies('testing libraries', ['@testing-library/jest-dom', '@testing-library/react', '@testing-library/user-event'])];
            case 9:
                _a.sent();
                if (!isRouter) return [3 /*break*/, 12];
                return [4 /*yield*/, addDependencies('react-router', ['react-router', 'react-router-dom'])];
            case 10:
                _a.sent();
                return [4 /*yield*/, addDependencies('router @types', ['@types/react-router-dom'])];
            case 11:
                _a.sent();
                _a.label = 12;
            case 12: return [4 /*yield*/, json.update('tsconfig.json')({
                    projectName: context.projectFolder,
                    message: '[json] adding baseUrl to tsconfig.json',
                    messageSuccess: '[json] add baseUrl to tsconfig.json',
                }, function (jsonFile) { return (__assign(__assign({}, jsonFile), { compilerOptions: __assign(__assign({}, jsonFile.compilerOptions), { baseUrl: 'src' }) })); })];
            case 13:
                _a.sent();
                return [4 /*yield*/, json.update('package.json')({
                        projectName: context.projectFolder,
                        message: '[json] cleaning package.json',
                        messageSuccess: '[json] clean package.json',
                    }, function (jsonFile) {
                        delete jsonFile.private;
                        delete jsonFile.browserslist;
                        delete jsonFile.eslintConfig;
                        delete jsonFile.scripts.eject;
                        return jsonFile;
                    })];
            case 14:
                _a.sent();
                return [4 /*yield*/, generate({
                        name: moduleName,
                        source: 'templates/base',
                        destination: '.',
                        context: {
                            projectName: context.projectName,
                        },
                    })];
            case 15:
                _a.sent();
                if (!isRouter) return [3 /*break*/, 17];
                return [4 /*yield*/, generate({
                        name: moduleName,
                        source: 'templates/react-router',
                        destination: '.',
                        context: {
                            projectName: context.projectName,
                        },
                    })];
            case 16:
                _a.sent();
                _a.label = 17;
            case 17: return [2 /*return*/];
        }
    });
}); };
