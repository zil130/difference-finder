import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

const expectedStylish = readFixture('expected_stylish.txt');
const expectedPlain = readFixture('expected_plain.txt');
const expectedJson = readFixture('expected_json.txt');

describe('tests', () => {
  test('tests JSON-files', () => {
    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toBe(expectedStylish);
    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish')).toBe(expectedStylish);
    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain')).toBe(expectedPlain);
    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json')).toBe(expectedJson);
  });

  test('tests YAML-files', () => {
    expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yml'))).toBe(expectedStylish);
    expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yml'), 'stylish')).toBe(expectedStylish);
    expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yml'), 'plain')).toBe(expectedPlain);
    expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yml'), 'json')).toBe(expectedJson);
  });
});
