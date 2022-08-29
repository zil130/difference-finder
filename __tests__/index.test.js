import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const getResultOfTest = (file1, file2, format, expectedResult) => {
  const diff = genDiff(getFixturePath(file1), getFixturePath(file2), format);
  const correctResult = readFile(expectedResult).trim();

  return expect(diff).toBe(correctResult);
};

test('Stylish-comparison of JSON-files with a nested structure', () => {
  getResultOfTest('file1.json', 'file2.json', 'stylish', 'expected_stylish.txt');
});

test('Stylish-comparison of YAML-files with a nested structure', () => {
  getResultOfTest('file1.yaml', 'file2.yml', 'stylish', 'expected_stylish.txt');
});

test('Stylish-comparison of JSON and YAML-files with a nested structure', () => {
  getResultOfTest('file1.json', 'file2.yml', 'stylish', 'expected_stylish.txt');
});

test('Plain-comparison of JSON-files with a nested structure', () => {
  getResultOfTest('file1.json', 'file2.json', 'plain', 'expected_plain.txt');
});

test('Plain-comparison of YAML-files with a nested structure', () => {
  getResultOfTest('file1.yaml', 'file2.yml', 'plain', 'expected_plain.txt');
});

test('Plain-comparison of JSON and YAML-files with a nested structure', () => {
  getResultOfTest('file1.json', 'file2.yml', 'plain', 'expected_plain.txt');
});

test('JSON-comparison of JSON-files with a nested structure', () => {
  getResultOfTest('file1.json', 'file2.json', 'json', 'expected_json.txt');
});

test('JSON-comparison of YAML-files with a nested structure', () => {
  getResultOfTest('file1.yaml', 'file2.yml', 'json', 'expected_json.txt');
});

test('JSON-comparison of JSON and YAML-files with a nested structure', () => {
  getResultOfTest('file1.json', 'file2.yml', 'json', 'expected_json.txt');
});
