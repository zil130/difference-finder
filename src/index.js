import { getObjectFromJsonFile, getSortedKeysWithoutDuplicates, hasKey } from './utils.js';

export default (file1, file2) => {
  const obj1 = getObjectFromJsonFile(file1);
  const obj2 = getObjectFromJsonFile(file2);
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
