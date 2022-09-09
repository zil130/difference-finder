import path from 'path';
import fs from 'fs';
import buildDiffTree from './buildDiffTree.js';
import parse from './parser.js';
import format from './formatters/index.js';

const extractFormat = (file) => path.extname(file).slice(1);

const getData = (filepath) => parse(fs.readFileSync(filepath, 'utf-8'), extractFormat(filepath));

export default (filepath1, filepath2, outputFormat = 'stylish') => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  const tree = buildDiffTree(data1, data2);

  return format(outputFormat)(tree);
};
