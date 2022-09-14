import _ from 'lodash';

const getValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return `${value}`;
};

const render = (tree, property = []) => {
  const result = tree.map((prop) => {
    const [key, keyDescription] = prop;
    const {
      children, status, value, oldValue,
    } = keyDescription;

    if (children) {
      return render(children, [...property, key]);
    }

    switch (status) {
      case 'changed':
        return `Property '${[...property, key].join('.')}' was updated. From ${getValue(oldValue)} to ${getValue(value)}`;
      case 'removed':
        return `Property '${[...property, key].join('.')}' was removed`;
      case 'added':
        return `Property '${[...property, key].join('.')}' was added with value: ${getValue(value)}`;
      default:
        return 'Property is unchanged';
    }
  });

  return result
    .filter((item) => item !== 'Property is unchanged')
    .join('\n');
};

export default (tree) => render(tree);
