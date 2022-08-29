import yaml from 'js-yaml';
import path from 'path';

const parser = (fileContent, fileName) => {
  const fileExtension = path.extname(fileName);

  let result;

  switch (fileExtension) {
    case '.json':
      result = JSON.parse(fileContent);
      break;

    case '.yaml':
    case '.yml':
      result = yaml.load(fileContent);
      break;

    default:
      console.log(`Unknown file extension: ${fileExtension}`);
  }

  return result;
};

export default parser;
