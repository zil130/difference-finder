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

describe('tests', () => {
  test.each(['json', 'yml'])('tests for %s-files', (fileExtension) => {
    const path1 = getFixturePath(`file1.${fileExtension}`);
    const path2 = getFixturePath(`file2.${fileExtension}`);

    expect(genDiff(path1, path2)).toBe(expectedStylish);
    expect(genDiff(path1, path2, 'stylish')).toBe(expectedStylish);
    expect(genDiff(path1, path2, 'plain')).toBe(expectedPlain);
    expect(() => JSON.parse(genDiff(path1, path2, 'json'))).not.toThrow();
  });
});
