const core = require('@actions/core');
const fs = require('fs');

/**
 * @param {string} path 
 */
function ReplaceBuildNumber(path) {
  const text = fs.readFileSync(path, 'utf8');
  const lines = text.split('\n');
  let nextLineIsBuildNumber = false;
  for (let i in lines) {
    if (nextLineIsBuildNumber) {
      const arr = lines[i].split(':');
      const number = parseInt(arr[1].match(/[0-9]+/)[0]) + 1;
      core.setOutput('newBuildNumber', number);
      core.info(`Bumping iOS build number from ${number-1} to ${number}`);
      arr[1] = arr[1].replace(/[0-9]+/, number.toString());
      lines[i] = arr.join(':');
      nextLineIsBuildNumber = false;
    }
    if (lines[i].includes('buildNumber:')) {
      nextLineIsBuildNumber = true;
    }
  }
  fs.writeFileSync(path, lines.join('\n'));
}

try {
  ReplaceBuildNumber(core.getInput('ProjectSettingsPath'));
} catch (error) {
  console.error(error.stack);
  core.setFailed(error.message);
}