import { getObjectFromJsonFile, getSortedKeysWithoutDuplicates, hasKey } from "./utils.js";

export default (file1, file2) => {
  const obj1 = getObjectFromJsonFile(file1);
  const obj2 = getObjectFromJsonFile(file2);
  const keys = getSortedKeysWithoutDuplicates(obj1, obj2);
  const result = keys.reduce((acc, item) => {
    if (hasKey(obj1, item) && hasKey(obj2, item)) {
      obj1[item] === obj2[item]
        ? acc += `    ${item}: ${obj1[item]}\n`
        : acc += `  - ${item}: ${obj1[item]}\n  + ${item}: ${obj2[item]}\n`;
    } else {
      hasKey(obj1, item)
        ? acc += `  - ${item}: ${obj1[item]}\n`
        : acc += `  + ${item}: ${obj2[item]}\n`;
    }
    return acc;
  }, '');

  return `{\n${result}}`;
};
