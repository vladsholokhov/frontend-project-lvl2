import _ from 'lodash';

const stringify = (value) => {
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
      .map(({
        status, name, value, children, oldValue, newValue,
      }) => {
        const fullPath = [...path, name].join('.');

        switch (status) {
          case 'nested':
            return iter(children, [...path, name]);

          case 'unchanged':
            return null;

          case 'removed':
            return `Property '${fullPath}' was removed`;

          case 'added':
            return `Property '${fullPath}' was added with value: ${stringify(value)}`;

          case 'modified':
            return `Property '${fullPath}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)}`;

          default:
            throw new Error(`Unknown difference: '${status}'!`);
        }
      })
      .filter((line) => line);

    return lines.join('\n');
  };

  return iter(tree, []);
};

export default plain;
