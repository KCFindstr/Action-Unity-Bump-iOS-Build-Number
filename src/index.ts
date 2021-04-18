import * as core from '@actions/core';
import * as fs from 'fs';

// const PATH = ['PlayerSettings', 'buildNumber', 'iPhone'];
const KEY_MATCHER = /^(\s*)([a-zA-Z0-9_]+):/;
// const VALUE_MATCHER = /^(\s*)([a-zA-Z0-9_]+):\s+(-?[0-9]+)/;

function ReplaceBuildNumber(path: string) {
  const text = fs.readFileSync(path, 'utf8');
  const lines = text.split('\n');
  // const output: string[] = [];
  const stack: string[] = [];
  for (const i in lines) {
    const line = lines[i];
    const matches = KEY_MATCHER.exec(line);
    if (!matches || matches.length !== 3) {
      continue;
    }
    const level = matches[1].length >> 1;
    if (level > stack.length + 1) {
      core.warning(`Line ${i}: Invalid YAML structure.`);
      continue;
    }
    console.log(matches[2]);
  }

  //   core.setOutput('oldBuildNumber', value);
  //   core.setOutput('newBuildNumber', value + 1);
}

try {
  ReplaceBuildNumber('./__tests__/ProjectSettings.asset');
  // ReplaceBuildNumber(core.getInput('ProjectSettingsPath'));
} catch (error) {
  console.error(error.stack);
  core.setFailed(error.message);
}
