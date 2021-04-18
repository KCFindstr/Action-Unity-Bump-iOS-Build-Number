"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReplaceBuildNumber = void 0;
const core = require("@actions/core");
const fs = require("fs");
const lodash_1 = require("lodash");
const PATH = ['PlayerSettings', 'buildNumber', 'iPhone'];
const KEY_MATCHER = /^(\s*)([a-zA-Z0-9_]+):/;
const VALUE_MATCHER = /^(\s*[a-zA-Z0-9_]+:\s+)(-?[0-9]+)$/;
function ReplaceBuildNumber(path) {
    const text = fs.readFileSync(path, 'utf8');
    const lines = text.split('\n');
    const stack = [];
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        let matches = KEY_MATCHER.exec(line);
        if (!matches || matches.length !== 3) {
            continue;
        }
        const level = matches[1].length >> 1;
        if (level > stack.length) {
            core.warning(`Line ${i + 1}: Invalid YAML structure.`);
            continue;
        }
        else {
            while (level < stack.length) {
                stack.pop();
            }
            stack.push(matches[2]);
        }
        if (lodash_1.isEqual(PATH, stack)) {
            matches = VALUE_MATCHER.exec(line);
            core.debug(`YAML path found: ${stack.join('.')} at line ${i + 1}, value = ${matches[2]}`);
            const value = parseInt(matches[2]);
            lines[i] = `${matches[1]}${value + 1}`;
            const output = lines.join('\n');
            fs.writeFileSync(path, output);
            core.setOutput('oldBuildNumber', value);
            core.setOutput('newBuildNumber', value + 1);
            return;
        }
    }
    throw new Error(`Unable to find path ${PATH.join('.')} in file ${path}.`);
}
exports.ReplaceBuildNumber = ReplaceBuildNumber;
//# sourceMappingURL=replace.js.map