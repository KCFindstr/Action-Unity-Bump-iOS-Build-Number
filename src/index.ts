import * as core from '@actions/core';
import { ReplaceBuildNumber } from './replace';

try {
  ReplaceBuildNumber(core.getInput('ProjectSettingsPath'));
} catch (error) {
  console.error(error.stack);
  core.setFailed(error.message);
}
