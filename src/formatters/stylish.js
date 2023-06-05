import _ from 'lodash';

const getValue = (value, indentLevel = 0) => {
  if (!_.isObject(value)) {
    return value;
  }

  const indent = '    '.repeat(indentLevel);
  const keys = Object.keys(value);
  const lastIndex = keys.length - 1;

  const lines = keys.map((key, index) => {
    const formattedValue = _.isObject(value[key])
      ? getValue(value[key], indentLevel + 1)
      : value[key];
    return `    ${indent}${key}: ${formattedValue}${index !== lastIndex ? '\n' : ''}`;
  });

  return [
    '{\n',
    ...lines,
    `\n${indent}}`,
  ].join('');
};

const render = (tree, depth) => tree
  .map((prop) => {
    const [key, keyDescription] = prop;
    const { type } = keyDescription;
    const spacesCount = 4;
    const indentSize = depth * spacesCount;
    const bracketIndent = ' '.repeat((indentSize - spacesCount) < 0 ? 0 : indentSize - spacesCount);

    switch (type) {
      case 'nested':
        return `${bracketIndent}    ${key}: {\n${render(keyDescription.children, depth + 1).join('\n')}\n${bracketIndent}    }`;
      case 'changed':
        return `${bracketIndent}  - ${key}: ${getValue(keyDescription.value1, depth)}\n${bracketIndent}  + ${key}: ${getValue(keyDescription.value2, depth)}`;
      case 'unchanged':
        return `${bracketIndent}    ${key}: ${keyDescription.value}`;
      case 'added':
        return `${bracketIndent}  + ${key}: ${getValue(keyDescription.value, depth)}`;
      case 'removed':
        return `${bracketIndent}  - ${key}: ${getValue(keyDescription.value, depth)}`;
      default:
        throw new Error(`Unknown type: '${type}'`);
    }
  });

export default (tree) => [
  '{',
  ...render(tree, 1),
  '}',
].join('\n');
