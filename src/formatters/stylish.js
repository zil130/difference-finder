const buildDiffTree = (tree) => tree.reduce((acc, prop) => {
  const [key, keyDescription] = prop;
  const {
    children, status, value, oldValue,
  } = keyDescription;

  if (children) {
    acc[`${key}`] = buildDiffTree(children);
  } else if (status === 'unchanged') {
    acc[`${key}`] = value;
  } else if (status === 'changed') {
    acc[`- ${key}`] = oldValue;
    acc[`+ ${key}`] = value;
  } else if (status === 'removed') {
    acc[`- ${key}`] = oldValue;
  } else if (status === 'added') {
    acc[`+ ${key}`] = value;
  }

  return acc;
}, {});

const buildStylishDiff = (data) => {
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
  const diffTree = buildDiffTree(tree);
  return buildStylishDiff(diffTree);
};
