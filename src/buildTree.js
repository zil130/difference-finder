import _ from 'lodash';

const buildTree = (data1, data2) => {
  const uniqueKeys = _.uniq([...Object.keys(data1), ...Object.keys(data2)]);
  const sortedKeys = _.sortBy(uniqueKeys);

  return sortedKeys.map((key) => {
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return [key, { children: buildTree(data1[key], data2[key]) }];
    }
    if (_.has(data1, key) && _.has(data2, key) && data1[key] === data2[key]) {
      return [key, { type: 'unchanged', value: data1[key] }];
    }
    if (_.has(data1, key) && _.has(data2, key) && data1[key] !== data2[key]) {
      return [key, { type: 'changed', value1: data1[key], value2: data2[key] }];
    }
    if (_.has(data1, key) && !_.has(data2, key)) {
      return [key, { type: 'removed', value: data1[key] }];
    }
    return [key, { type: 'added', value: data2[key] }];
  });
};

export default buildTree;
