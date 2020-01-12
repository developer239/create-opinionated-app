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
import { initReactNativeApp } from 'packages/_ReactNative';
import { addEditorconfig } from 'packages/editorconfig';
import { addPrettier } from 'packages/prettier';
import { addStylelint } from 'packages/stylelint';
import { addEslint } from 'packages/eslint';
import { addFilesToGit } from 'packages/git/add';
import { setUpGitHooks } from 'packages/git/hooks';
export var createReactNativeApp = function (context) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: 
            // Init app
            return [4 /*yield*/, initReactNativeApp({
                    projectFolder: context.projectFolder,
                    projectName: context.projectName,
                })
                // Code quality tools
            ];
            case 1:
                // Init app
                _a.sent();
                // Code quality tools
                return [4 /*yield*/, addEditorconfig()];
            case 2:
                // Code quality tools
                _a.sent();
                return [4 /*yield*/, addPrettier({ projectFolder: context.projectFolder })];
            case 3:
                _a.sent();
                return [4 /*yield*/, addStylelint({ projectType: context.projectType, appType: context.appType, projectFolder: context.projectFolder })];
            case 4:
                _a.sent();
                return [4 /*yield*/, addEslint({ projectType: context.projectType, appType: context.appType, projectFolder: context.projectFolder })
                    // Git hooks
                ];
            case 5:
                _a.sent();
                // Git hooks
                return [4 /*yield*/, setUpGitHooks()
                    // Commit and share on Github
                ];
            case 6:
                // Git hooks
                _a.sent();
                // Commit and share on Github
                return [4 /*yield*/, addFilesToGit({ projectFolder: context.projectFolder })];
            case 7:
                // Commit and share on Github
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
