import _ from 'lodash';

const stylish = (tree) => {
  const replacer = ' ';
  const spaces = 4;
  const getBracketIndent = (depth) => replacer.repeat(spaces * (depth - 1));
  const formatValue = (value, depth) => {
    if (!_.isObject(value)) {
      return value;
    }

    const nestedIndent = replacer.repeat(spaces * depth);

    const entries = Object.entries(value);
    const lines = entries.map(([key, val]) => `${nestedIndent}${key}: ${formatValue(val, depth + 1)}`);

    return [
      '{',
      ...lines,
      `${getBracketIndent(depth)}}`,
    ].join('\n');
  };

  const iter = (node, depth) => {
    const indent = replacer.repeat((spaces * depth) - 2);

    const lines = node
      .map((element) => {
        switch (element.type) {
          case 'nested':
            return `${indent}  ${element.name}: ${iter(element.children, depth + 1)}`;

          case 'unchanged':
            return `${indent}  ${element.name}: ${formatValue(element.value, depth + 1)}`;

          case 'removed':
            return `${indent}- ${element.name}: ${formatValue(element.value, depth + 1)}`;

          case 'added':
            return `${indent}+ ${element.name}: ${formatValue(element.value, depth + 1)}`;

          case 'modified':
            return `${indent}- ${element.name}: ${formatValue(element.value1, depth + 1)}\n${indent}+ ${element.name}: ${formatValue(element.value2, depth + 1)}`;

          default:
            throw new Error(`Unknown type: '${element.type}'!`);
        }
      });

    return [
      '{',
      ...lines,
      `${getBracketIndent(depth)}}`,
    ].join('\n');
  };

  return iter(tree, 1);
};

export default stylish;
