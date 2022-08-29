import fs from 'fs';
import path from 'path';
import parser from './parsers.js';
import getDiff from './getDiff.js';
import stylish from './formatters/stylish.js';

const getFilePath = (file) => path.resolve(process.cwd(), '__fixtures__', file);
const readFile = (filePath) => fs.readFileSync(filePath, { encoding: 'utf8' });

const genDiff = (file1, file2, format) => {
  const fileOnePath = getFilePath(file1);
  const fileTwoPah = getFilePath(file2);
  const fileOneContent = parser(readFile(fileOnePath), fileOnePath);
  const fileTwoContent = parser(readFile(fileTwoPah), fileTwoPah);

  const diff = getDiff(fileOneContent, fileTwoContent);

  console.log(stylish(diff));
};

export default genDiff;
