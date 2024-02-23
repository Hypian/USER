"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const json_schema_to_typescript_1 = require("json-schema-to-typescript");
const path_1 = __importDefault(require("path"));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const buildDirPath = path_1.default.join(process.cwd(), 'build');
        const schemaDirPath = path_1.default.join(process.cwd(), 'schemas');
        const replaceRegex = /"vscode:\/\/schemas\/(.+)"/g;
        const schemaFileNames = fs_1.default.readdirSync(path_1.default.join(schemaDirPath));
        schemaFileNames.forEach((fileName) => {
            const schemaContent = fs_1.default.readFileSync(path_1.default.join(schemaDirPath, fileName), { encoding: 'utf8' });
            const formattedSchema = schemaContent.replace(replaceRegex, (_, capture) => `"${path_1.default.join(buildDirPath, `${capture}.json`)}"`);
            fs_1.default.writeFileSync(path_1.default.join(buildDirPath, fileName), formattedSchema);
        });
        const generatedTypes = yield (0, json_schema_to_typescript_1.compileFromFile)(path_1.default.join(buildDirPath, 'color-theme.json'));
        fs_1.default.writeFileSync(path_1.default.join(process.cwd(), 'src', 'types', 'index.d.ts'), generatedTypes);
    }
    catch (error) {
        console.error('Error generating Typescript types from schema:', error);
    }
});
main();
//# sourceMappingURL=schema.js.map