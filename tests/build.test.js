/* eslint-disable import/no-extraneous-dependencies */
const {execSync} = require('child_process');
const {existsSync} = require('fs');
const {sync: globSync} = require('glob');
const {dirname} = require('path');
const {
  main: mainBundlePath,
  module: moduleBundlePath,
  types: typesPath,
} = require('../package.json');

function execCommand(command) {
  execSync(command, {stdio: 'inherit'});
}

describe('build', () => {
  beforeAll(() => {
    execCommand('yarn clean');
  });

  beforeEach(() => {
    execCommand('yarn build');
  });

  afterEach(() => {
    execCommand('yarn clean');
  });

  it('generates a main bundle', () => {
    expect(existsSync(mainBundlePath)).toBe(true);
  });

  it('generates an esnext bundle', () => {
    expect(existsSync(moduleBundlePath)).toBe(true);
  });

  it('generates valid types', () => {
    expect(existsSync(typesPath)).toBe(true);
    const typesDir = dirname(typesPath);
    const files = globSync(`${typesDir}/**/*.d.ts`);
    execCommand(`yarn run tsc --noEmit ${files.join(' ')}`);
  });
});
