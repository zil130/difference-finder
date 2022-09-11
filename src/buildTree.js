import _ from 'lodash';

const hasKey = (obj, key) => Object.keys(obj).includes(key);

const isObjects = (value1, value2) => _.isPlainObject(value1) && _.isPlainObject(value2);

const getSortedKeysWithoutDuplicates = (obj1, obj2) => {
  const keys = [...Object.keys(obj1), ...Object.keys(obj2)];

  return _.sortBy(_.uniq(keys));
};

const buildTree = (obj1, obj2) => {
  const keys = getSortedKeysWithoutDuplicates(obj1, obj2);

  return keys.map((key) => {
    if (isObjects(obj1[key], obj2[key])) {
      return [key, { children: buildTree(obj1[key], obj2[key]) }];
    }
    if (hasKey(obj1, key) && hasKey(obj2, key) && obj1[key] === obj2[key]) {
      return [key, { status: 'unchanged', value: obj2[key] }];
    }
    if (hasKey(obj1, key) && hasKey(obj2, key) && obj1[key] !== obj2[key]) {
      return [key, { status: 'changed', value: obj2[key], oldValue: obj1[key] }];
    }
    if (hasKey(obj1, key) && !hasKey(obj2, key)) {
      return [key, { status: 'removed', oldValue: obj1[key] }];
    }
    return [key, { status: 'added', value: obj2[key] }];
  });
};

export default buildTree;
