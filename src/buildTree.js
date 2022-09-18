import _ from 'lodash';

const hasKey = (obj, key) => Object.keys(obj).includes(key);

const isObjects = (value1, value2) => _.isPlainObject(value1) && _.isPlainObject(value2);

const buildTree = (obj1, obj2) => {
  const uniqueKeys = _.uniq([...Object.keys(obj1), ...Object.keys(obj2)]);
  const sortedKeys = _.sortBy(uniqueKeys);

  return sortedKeys.map((key) => {
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
