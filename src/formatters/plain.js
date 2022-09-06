const getValue = (value) => {
  let result;

  if ((typeof value === 'object' || typeof value === 'function') && value !== null) {
    result = '[complex value]';
  } else if (typeof value === 'string') {
    result = `'${value}'`;
  } else {
    result = `${value}`;
  }

  return result;
};

const buildPlainDiff = (tree, property = []) => {
  const result = tree.reduce((acc, prop) => {
    const [key, keyDescription] = prop;
    property.push(key);
    const { children, status } = keyDescription;
    let { value, oldValue } = keyDescription;
    value = getValue(value);
    oldValue = getValue(oldValue);
    let resultItem;

    if (children) {
      resultItem = buildPlainDiff(children, property);
    } else if (status === 'changed') {
      resultItem = `Property '${property.join('.')}' was updated. From ${oldValue} to ${value}`;
    } else if (status === 'removed') {
      resultItem = `Property '${property.join('.')}' was removed`;
    } else if (status === 'added') {
      resultItem = `Property '${property.join('.')}' was added with value: ${value}`;
    }

    if (resultItem) {
      acc.push(resultItem);
    }
    property.pop();

    return acc;
  }, []);

  return result.join('\n');
};

export default (tree) => buildPlainDiff(tree);
