import _ from 'lodash';

const formatObject = (obj, indentLevel = 0) => {
  const indent = '    '.repeat(indentLevel);

  const keys = Object.keys(obj);
  const lastIndex = keys.length - 1;

  const lines = keys.map((key, index) => {
    const value = obj[key];
    const formattedValue = _.isObject(value) ? formatObject(value, indentLevel + 1) : value;
    return `    ${indent}${key}: ${formattedValue}${index !== lastIndex ? '\n' : ''}`;
  });

  return [
    '{\n',
    ...lines,
    `\n${indent}}`,
  ].join('');
};

const getValue = (value, indentLevel) => {
  if (_.isObject(value)) {
    return formatObject(value, indentLevel);
  }
  return value;
};

const render = (tree, depth) => tree
  .map((prop) => {
    const [key, keyDescription] = prop;
    const {
      children, type, value, value1, value2,
    } = keyDescription;
    const spacesCount = 4;
    const indentSize = depth * spacesCount;
    const bracketIndent = ' '.repeat((indentSize - spacesCount) < 0 ? 0 : indentSize - spacesCount);

    switch (type) {
      case 'unchanged':
        return `${bracketIndent}    ${key}: ${value}`;
      case 'changed':
        return `${bracketIndent}  - ${key}: ${getValue(value1, depth)}\n${bracketIndent}  + ${key}: ${getValue(value2, depth)}`;
      case 'removed':
        return `${bracketIndent}  - ${key}: ${getValue(value, depth)}`;
      case 'added':
        return `${bracketIndent}  + ${key}: ${getValue(value, depth)}`;
      case undefined:
        return `${bracketIndent}    ${key}: {\n${render(children, depth + 1).join('\n')}\n${bracketIndent}    }`;
      default:
        throw new Error(`Unknown type: '${type}'`);
    }
  });

export default (tree) => [
  '{',
  ...render(tree, 1),
  '}',
].join('\n');
