import path from 'path';
import fs from 'fs';
import buildDiffTree from './buildDiffTree.js';
import parse from './parser.js';
import format from './formatters/index.js';

const readFile = (file) => fs.readFileSync(file, 'utf-8');

const extractFormat = (file) => path.extname(file).slice(1);

const getData = (filepath) => {
  const content = readFile(filepath);
  const fileFormat = extractFormat(filepath);

  return parse(content, fileFormat);
};

export default (filepath1, filepath2, outputFormat = 'stylish') => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  const tree = buildDiffTree(data1, data2);

  return format(outputFormat)(tree);
};
