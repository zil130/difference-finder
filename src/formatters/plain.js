import _ from 'lodash';

const getValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return String(value);
};

const render = (tree, property = []) => {
  const result = tree.map((prop) => {
    const [key, keyDescription] = prop;
    const { type } = keyDescription;

    switch (type) {
      case 'nested':
        return render(keyDescription.children, [...property, key]);
      case 'changed':
        return `Property '${[...property, key].join('.')}' was updated. From ${getValue(keyDescription.value1)} to ${getValue(keyDescription.value2)}`;
      case 'unchanged':
        return null;
      case 'added':
        return `Property '${[...property, key].join('.')}' was added with value: ${getValue(keyDescription.value)}`;
      case 'removed':
        return `Property '${[...property, key].join('.')}' was removed`;
      default:
        throw new Error(`Unknown type: '${type}'`);
    }
  });

  return result
    .filter((item) => item)
    .join('\n');
};

export default (tree) => render(tree);
