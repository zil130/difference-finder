const buildStylishTree = (tree) => tree
  .reduce((acc, prop) => {
    const [key, keyDescription] = prop;
    const {
      children, type, value, value1, value2,
    } = keyDescription;

    switch (type) {
      case 'unchanged':
        return { ...acc, [`${key}`]: value };
      case 'changed':
        return { ...acc, [`- ${key}`]: value1, [`+ ${key}`]: value2 };
      case 'removed':
        return { ...acc, [`- ${key}`]: value };
      case 'added':
        return { ...acc, [`+ ${key}`]: value };
      default:
        return { ...acc, [`${key}`]: buildStylishTree(children) };
    }
  }, {});

const render = (data) => {
  const iter = (currentValue, depth) => {
    if (typeof currentValue !== 'object' || currentValue === null) {
      return String(currentValue);
    }

    if (Array.isArray(currentValue)) {
      return `[${currentValue}]`;
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
  const stylishTree = buildStylishTree(tree);
  return render(stylishTree);
};
