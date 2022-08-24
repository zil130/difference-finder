const getDiffTree = (tree) => {
  const result = tree.reduce((acc, prop) => {
    const [key, keyDescription] = prop;

    if (keyDescription.children) {
      acc[`${key}`] = getDiffTree(keyDescription.children);
    } else if (keyDescription.status === 'unchanged') {
      acc[`${key}`] = keyDescription.value;
    } else if (keyDescription.status === 'changed') {
      acc[`- ${key}`] = keyDescription.oldValue;
      acc[`+ ${key}`] = keyDescription.value;
    } else if (keyDescription.status === 'removed') {
      acc[`- ${key}`] = keyDescription.oldValue;
    } else if (keyDescription.status === 'added') {
      acc[`+ ${key}`] = keyDescription.value;
    }

    return acc;
  }, {});

  return result;
};

const stringify = (data) => JSON
  .stringify(data, ' ', 4)
  .replaceAll('"', '')
  .replaceAll(',', '')
  .replaceAll('    + ', '  + ')
  .replaceAll('    - ', '  - ');

export default (tree) => {
  const diffTree = getDiffTree(tree);
  return stringify(diffTree);
};
