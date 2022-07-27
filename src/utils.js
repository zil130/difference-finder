import fs from 'fs';

const getObjectFromJsonFile = (jsonFile) => JSON.parse(fs.readFileSync(jsonFile, 'utf-8'));

const getSortedKeysWithoutDuplicates = (obj1, obj2) => {
  const keys = [...Object.keys(obj1), ...Object.keys(obj2)];
  return [...new Set(keys)].sort();
};

const hasKey = (obj, key) => Object.keys(obj).includes(key);

export {
  getObjectFromJsonFile,
  getSortedKeysWithoutDuplicates,
  hasKey
};
