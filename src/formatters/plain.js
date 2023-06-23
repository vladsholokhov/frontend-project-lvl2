import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return String(value);
};

const plain = (tree) => {
  const iter = (node, path) => {
    const lines = node
      .map((element) => {
        const fullPath = [...path, element.name].join('.');

        switch (element.type) {
          case 'nested':
            return iter(element.children, [...path, element.name]);

          case 'unchanged':
            return null;

          case 'removed':
            return `Property '${fullPath}' was removed`;

          case 'added':
            return `Property '${fullPath}' was added with value: ${stringify(element.value)}`;

          case 'modified':
            return `Property '${fullPath}' was updated. From ${stringify(element.value1)} to ${stringify(element.value2)}`;

          default:
            throw new Error(`Unknown status: '${element.type}'!`);
        }
      })
      .filter((line) => line);

    return lines.join('\n');
  };

  return iter(tree, []);
};

export default plain;
