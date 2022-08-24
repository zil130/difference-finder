import path from 'path';
import fs from 'fs';

const getSortedKeysWithoutDuplicates = (obj1, obj2) => {
  const keys = [...Object.keys(obj1), ...Object.keys(obj2)];
  return [...new Set(keys)].sort();
};

const hasKey = (obj, key) => Object.keys(obj).includes(key);

const getData = (file) => fs.readFileSync(file, 'utf-8');

const getFilenameExtension = (file) => path.extname(file);

const isObjects = (value1, value2) => typeof value1 === 'object'
  && !Array.isArray(value1)
  && value1 !== null
  && typeof value2 === 'object'
  && !Array.isArray(value2)
  && value2 !== null;

export {
  getSortedKeysWithoutDuplicates,
  hasKey,
  getData,
  getFilenameExtension,
  isObjects,
};
