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

const getStylishOutput = (data) => {
  const iter = (currentValue, depth) => {
    if (typeof currentValue !== 'object' || currentValue === null) {
      return `${currentValue}`;
    }

    const spacesCount = 4;
    const indentSize = depth * spacesCount;
    const bracketIndent = ' '.repeat(indentSize - spacesCount);
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => {
        const currentIndent = (key.substring(0, 2) === '+ ' || key.substring(0, 2) === '- ')
          ? ' '.repeat(indentSize - 2)
          : ' '.repeat(indentSize);

        return `${currentIndent}${key}: ${iter(val, depth + 1)}`;
      });

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(data, 1);
};

export default (tree) => {
  const diffTree = getDiffTree(tree);
  return getStylishOutput(diffTree);
};
