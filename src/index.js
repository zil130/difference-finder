import {
  getSortedKeysWithoutDuplicates, hasKey, getData, getFilenameExtension,
} from './utils.js';
import getObjectFromData from './parsers.js';

export default (file1, file2) => {
  const data1 = getData(file1);
  const data2 = getData(file2);
  const filenameExtension1 = getFilenameExtension(file1);
  const filenameExtension2 = getFilenameExtension(file2);
  const obj1 = getObjectFromData(data1, filenameExtension1);
  const obj2 = getObjectFromData(data2, filenameExtension2);
  const keys = getSortedKeysWithoutDuplicates(obj1, obj2);

  const getKeyComparison = (acc, key) => {
    let newAcc = '';

    if (hasKey(obj1, key) && hasKey(obj2, key)) {
      newAcc = (obj1[key] === obj2[key])
        ? `    ${key}: ${obj1[key]}\n`
        : `  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}\n`;
    } else {
      newAcc = (hasKey(obj1, key))
        ? `  - ${key}: ${obj1[key]}\n`
        : `  + ${key}: ${obj2[key]}\n`;
    }

    newAcc = acc + newAcc;

    return newAcc;
  };

  const result = keys.reduce(getKeyComparison, '');

  return `{\n${result}}`;
};
