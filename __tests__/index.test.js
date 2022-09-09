import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const expectedStylish = readFile('expected_stylish.txt').trim();
const expectedPlain = readFile('expected_plain.txt').trim();
const expectedJson = readFile('expected_json.txt').trim();

describe.each([
  ['no formatter'], ['stylish formatter'], ['plain formatter'], ['json formatter']
])('JSON-files', (formatter) => {
  test(formatter, () => {
    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toBe(expectedStylish);
    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish')).toBe(expectedStylish);
    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain')).toBe(expectedPlain);
    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json')).toBe(expectedJson);
  });
});

describe.each([
  ['no formatter'], ['stylish formatter'], ['plain formatter'], ['json formatter']
])('YAML-files', (formatter) => {
  test(formatter, () => {
    expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yml'))).toBe(expectedStylish);
    expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yml'), 'stylish')).toBe(expectedStylish);
    expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yml'), 'plain')).toBe(expectedPlain);
    expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yml'), 'json')).toBe(expectedJson);
  });
});
