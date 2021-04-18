"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core = require("@actions/core");
const replace_1 = require("./replace");
try {
    replace_1.ReplaceBuildNumber(core.getInput('ProjectSettingsPath'));
}
catch (error) {
    console.error(error.stack);
    core.setFailed(error.message);
}
//# sourceMappingURL=index.js.map