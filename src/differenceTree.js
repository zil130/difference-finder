import {
  hasKey, isObjects, getSortedKeysWithoutDuplicates,
} from './utils.js';

const getDifferenceTree = (keys, obj1, obj2) => {
  const result = keys.map((key) => {
    let item;

    if (isObjects(obj1[key], obj2[key])) {
      const innerKeys = getSortedKeysWithoutDuplicates(obj1[key], obj2[key]);
      item = [key, { children: getDifferenceTree(innerKeys, obj1[key], obj2[key]) }];
    } else if (hasKey(obj1, key) && hasKey(obj2, key) && obj1[key] === obj2[key]) {
      item = [key, { status: 'unchanged', value: obj2[key] }];
    } else if (hasKey(obj1, key) && hasKey(obj2, key) && obj1[key] !== obj2[key]) {
      item = [key, { status: 'changed', value: obj2[key], oldValue: obj1[key] }];
    } else if (hasKey(obj1, key) && !hasKey(obj2, key)) {
      item = [key, { status: 'removed', oldValue: obj1[key] }];
    } else if (!hasKey(obj1, key) && hasKey(obj2, key)) {
      item = [key, { status: 'added', value: obj2[key] }];
    }

    return item;
  });

  return result;
};

export default getDifferenceTree;
