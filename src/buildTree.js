import _ from 'lodash';

const hasKey = (data, key) => Object.keys(data).includes(key);

const buildTree = (data1, data2) => {
  const uniqueKeys = _.uniq([...Object.keys(data1), ...Object.keys(data2)]);
  const sortedKeys = _.sortBy(uniqueKeys);

  return sortedKeys.map((key) => {
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return [key, { children: buildTree(data1[key], data2[key]) }];
    }
    if (hasKey(data1, key) && hasKey(data2, key) && data1[key] === data2[key]) {
      return [key, { status: 'unchanged', value: data2[key] }];
    }
    if (hasKey(data1, key) && hasKey(data2, key) && data1[key] !== data2[key]) {
      return [key, { status: 'changed', value: data2[key], oldValue: data1[key] }];
    }
    if (hasKey(data1, key) && !hasKey(data2, key)) {
      return [key, { status: 'removed', oldValue: data1[key] }];
    }
    return [key, { status: 'added', value: data2[key] }];
  });
};

export default buildTree;
