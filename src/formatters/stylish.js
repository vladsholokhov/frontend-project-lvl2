import _ from 'lodash';

const stylish = (tree) => {
  const replacer = ' ';
  const spacesCount = 4;

  const formatValue = (value, depth) => {
    if (!_.isObject(value)) {
      return value;
    }

    const nestedIndent = replacer.repeat(spacesCount * depth);
    const bracketIndent = replacer.repeat(spacesCount * (depth - 1));

    const entries = Object.entries(value);
    const lines = entries.map(([key, val]) => `${nestedIndent}${key}: ${formatValue(val, depth + 1)}`);

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  const iter = (node, depth) => {
    const indent = replacer.repeat((spacesCount * depth) - 2);
    const bracketIndent = replacer.repeat(spacesCount * (depth - 1));

    const lines = node
      .map((child) => {
        const { status } = child;

        switch (status) {
          case 'nested':
            return `${indent}  ${child.name}: ${iter(child.children, depth + 1)}`;

          case 'unchanged':
            return `${indent}  ${child.name}: ${formatValue(child.value, depth + 1)}`;

          case 'removed':
            return `${indent}- ${child.name}: ${formatValue(child.value, depth + 1)}`;

          case 'added':
            return `${indent}+ ${child.name}: ${formatValue(child.value, depth + 1)}`;

          case 'modified':
            return `${indent}- ${child.name}: ${formatValue(child.oldValue, depth + 1)}\n${indent}+ ${child.name}: ${formatValue(child.newValue, depth + 1)}`;

          default:
            throw new Error(`Unknown difference: '${status}'!`);
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
