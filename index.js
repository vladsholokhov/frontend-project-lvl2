import fs from 'fs';
import path from 'path';
import parser from './src/parsers.js';
import getDiff from './src/getDiff.js';
import getFormatter from './src/formatters/index.js';

const getFilePath = (file) => path.resolve(process.cwd(), '__fixtures__', file);
const readFile = (filePath) => fs.readFileSync(filePath, { encoding: 'utf8' });

const genDiff = (file1, file2, format = 'stylish') => {
  const fileOnePath = getFilePath(file1);
  const fileTwoPath = getFilePath(file2);
  const fileOneContent = parser(readFile(fileOnePath), path.extname(fileOnePath));
  const fileTwoContent = parser(readFile(fileTwoPath), path.extname(fileTwoPath));

  const diff = getDiff(fileOneContent, fileTwoContent);
  return getFormatter(format)(diff);
};

export default genDiff;
