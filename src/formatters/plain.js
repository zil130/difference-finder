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

const getDiffTree = (tree, property = []) => {
  const result = tree.reduce((acc, prop) => {
    const [key, keyDescription] = prop;
    property.push(key);
    const value = getValue(keyDescription.value);
    const oldValue = getValue(keyDescription.oldValue);

    if (keyDescription.children) {
      acc.push(getDiffTree(keyDescription.children, property));
    } else if (keyDescription.status === 'changed') {
      acc.push(`Property '${property.join('.')}' was updated. From ${oldValue} to ${value}`);
    } else if (keyDescription.status === 'removed') {
      acc.push(`Property '${property.join('.')}' was removed`);
    } else if (keyDescription.status === 'added') {
      acc.push(`Property '${property.join('.')}' was added with value: ${value}`);
    }

    property.pop();

    return acc;
  }, []);

  return result.join('\n');
};

export default (tree) => {
  const diffTree = getDiffTree(tree);
  return diffTree;
};
