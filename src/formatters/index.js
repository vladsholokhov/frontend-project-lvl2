import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const doFormatting = (format, diff) => {
  switch (format) {
    case 'plain':
      return plain(diff);
    case 'json':
      return json(diff);
    case 'stylish':
      return stylish(diff);
    default:
      throw new Error(`Unknown formatter: ${format}`);
  }
};

export default doFormatting;
