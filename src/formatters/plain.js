import _ from 'lodash';

const getValueToPrint = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return value;
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
            return `Property '${fullPath}' was added with value: ${getValueToPrint(element.value)}`;

          case 'modified':
            return `Property '${fullPath}' was updated. From ${getValueToPrint(element.value1)} to ${getValueToPrint(element.value2)}`;

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
