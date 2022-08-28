import {
  getSortedKeysWithoutDuplicates, getData, getFilenameExtension,
} from './utils.js';
import getDifferenceTree from './differenceTree.js';
import getObjectFromData from './parsers.js';
import stylish from './formatters/stylish.js';
import plain from './formatters/plain.js';

export default (file1, file2) => {
  const data1 = getData(file1);
  const data2 = getData(file2);
  const filenameExtension1 = getFilenameExtension(file1);
  const filenameExtension2 = getFilenameExtension(file2);
  const obj1 = getObjectFromData(data1, filenameExtension1);
  const obj2 = getObjectFromData(data2, filenameExtension2);
  const keys = getSortedKeysWithoutDuplicates(obj1, obj2);
  const tree = getDifferenceTree(keys, obj1, obj2);

  return plain(tree);
};
