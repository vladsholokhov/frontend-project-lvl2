import _ from 'lodash';

const stylish = (tree) => {
  const replacer = ' ';
  const spaces = 4;

  const formatValue = (value, depth) => {
    if (!_.isObject(value)) {
      return value;
    }

    const nestedIndent = replacer.repeat(spaces * depth);
    const bracketIndent = replacer.repeat(spaces * (depth - 1));

    const entries = Object.entries(value);
    const lines = entries.map(([key, val]) => `${nestedIndent}${key}: ${formatValue(val, depth + 1)}`);

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  const iter = (node, depth) => {
    const indent = replacer.repeat((spaces * depth) - 2);
    const bracketIndent = replacer.repeat(spaces * (depth - 1));

    const lines = node
      .map(({
        status, name, children, value, oldValue, newValue,
      }) => {
        switch (status) {
          case 'nested':
            return `${indent}  ${name}: ${iter(children, depth + 1)}`;

          case 'unchanged':
            return `${indent}  ${name}: ${formatValue(value, depth + 1)}`;

          case 'removed':
            return `${indent}- ${name}: ${formatValue(value, depth + 1)}`;

          case 'added':
            return `${indent}+ ${name}: ${formatValue(value, depth + 1)}`;

          case 'modified':
            return `${indent}- ${name}: ${formatValue(oldValue, depth + 1)}\n${indent}+ ${name}: ${formatValue(newValue, depth + 1)}`;

          default:
            throw new Error(`Unknown status: '${status}'!`);
        }
      });

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(tree, 1);
};

export default stylish;
