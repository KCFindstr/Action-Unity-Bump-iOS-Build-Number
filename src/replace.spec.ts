import * as fs from 'fs';
import * as path from 'path';
import { ReplaceBuildNumber } from './replace';

jest.mock('@actions/core');
import * as core from '@actions/core';

const INPUT_FILE = './assets/ProjectSettings.asset';
const INVALID_INPUT_FILE = './assets/ProjectSettings.invalid.asset';
const OUTPUT_FILE = './assets/ProjectSettings.expected.asset';

const TEMP_DIR = './temp';
const TEMP_INPUT = path.join(TEMP_DIR, 'ProjectSettings.asset');

describe('Increase build number by 1', () => {
  beforeAll(() => {
    if (!fs.existsSync(TEMP_DIR)) {
      fs.mkdirSync(TEMP_DIR);
    }
  });

  afterAll(() => {
    if (fs.existsSync(TEMP_DIR)) {
      fs.rmdirSync(TEMP_DIR, { recursive: true });
    }
  });

  function expectSameFiles(result: string, expected: string) {
    const content1 = fs.readFileSync(result, 'utf-8');
    const content2 = fs.readFileSync(expected, 'utf-8');
    expect(content1).toEqual(content2);
  }

  it('should correctly increase build number', () => {
    fs.copyFileSync(INPUT_FILE, TEMP_INPUT);
    ReplaceBuildNumber(TEMP_INPUT);
    expectSameFiles(TEMP_INPUT, OUTPUT_FILE);
    expect(core.warning).not.toHaveBeenCalled();
    expect(core.setOutput).toHaveBeenCalledWith('oldBuildNumber', 1);
    expect(core.setOutput).toHaveBeenCalledWith('newBuildNumber', 2);
  });

  it('should recognize invalid YAML structure', () => {
    fs.copyFileSync(INVALID_INPUT_FILE, TEMP_INPUT);
    expect(() => ReplaceBuildNumber(TEMP_INPUT)).toThrowError(
      'Unable to find path',
    );
    expect(core.warning).toHaveBeenCalledWith(
      expect.stringContaining('Invalid YAML structure'),
    );
    expect(core.setOutput).not.toHaveBeenCalled();
  });
});
