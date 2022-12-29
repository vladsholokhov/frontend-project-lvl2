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
      .map((element) => {
        switch (element.status) {
          case 'nested':
            return `${indent}  ${element.name}: ${iter(element.children, depth + 1)}`;

          case 'unchanged':
            return `${indent}  ${element.name}: ${formatValue(element.value, depth + 1)}`;

          case 'removed':
            return `${indent}- ${element.name}: ${formatValue(element.value, depth + 1)}`;

          case 'added':
            return `${indent}+ ${element.name}: ${formatValue(element.value, depth + 1)}`;

          case 'modified':
            return `${indent}- ${element.name}: ${formatValue(element.previousValue, depth + 1)}\n${indent}+ ${element.name}: ${formatValue(element.currentValue, depth + 1)}`;

          default:
            throw new Error(`Unknown status: '${element.status}'!`);
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
