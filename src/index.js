import fs from 'fs';
import path from 'path';
import parser from './parsers.js';
import getDiff from './getDiff.js';
import getFormatter from './formatters/index.js';

const getFilePath = (file) => path.resolve(process.cwd(), '__fixtures__', file);
const readFile = (filePath) => fs.readFileSync(filePath, { encoding: 'utf8' });

const genDiff = (file1, file2, format = 'stylish') => {
  const fileOnePath = getFilePath(file1);
  const fileTwoPah = getFilePath(file2);
  const fileOneContent = parser(readFile(fileOnePath), fileOnePath);
  const fileTwoContent = parser(readFile(fileTwoPah), fileTwoPah);

  const diff = getDiff(fileOneContent, fileTwoContent);
  const result = getFormatter(format)(diff);
  console.log(result);
  return result;
};

export default genDiff;
