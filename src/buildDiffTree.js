const hasKey = (obj, key) => Object.keys(obj).includes(key);

const isObjects = (value1, value2) => typeof value1 === 'object'
  && !Array.isArray(value1)
  && value1 !== null
  && typeof value2 === 'object'
  && !Array.isArray(value2)
  && value2 !== null;

const getSortedKeysWithoutDuplicates = (obj1, obj2) => {
  const keys = [...Object.keys(obj1), ...Object.keys(obj2)];

  return [...new Set(keys)].sort();
};

const buildDiffTree = (obj1, obj2) => {
  const keys = getSortedKeysWithoutDuplicates(obj1, obj2);

  return keys.map((key) => {
    let item;

    if (isObjects(obj1[key], obj2[key])) {
      item = [key, { children: buildDiffTree(obj1[key], obj2[key]) }];
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
};

export default buildDiffTree;
