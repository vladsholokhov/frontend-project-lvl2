import stylish from './stylish.js';
import plain from './plain.js';

const getFormatter = (format) => {
  switch (format) {
    case 'plain':
      return plain;
    default:
      return stylish;
  }
};

export default getFormatter;
