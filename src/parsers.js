import yaml from 'js-yaml';

const parser = (fileContent, fileExtension) => {
  switch (fileExtension) {
    case '.json':
      return JSON.parse(fileContent);

    case '.yaml':
    case '.yml':
      return yaml.load(fileContent);

    default:
      throw new Error(`Unknown file extension: ${fileExtension}`);
  }
};

export default parser;
