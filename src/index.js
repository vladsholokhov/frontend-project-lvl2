import path from 'path';
import fs from 'fs';
import parser from './parsers.js';
import buildDiffTree from './buildDiffTree.js';
import doFormatting from './formatters/index.js';

const getFilePath = (file) => path.resolve(process.cwd(), file);
const readFile = (filePath) => fs.readFileSync(filePath, { encoding: 'utf8' });

const index = (file1, file2, format = 'stylish') => {
  const fileOnePath = getFilePath(file1);
  const fileTwoPath = getFilePath(file2);
  const fileOneContent = parser(readFile(fileOnePath), path.extname(fileOnePath).substring(1));
  const fileTwoContent = parser(readFile(fileTwoPath), path.extname(fileTwoPath).substring(1));

  const diff = buildDiffTree(fileOneContent, fileTwoContent);
  return doFormatting(format, diff);
};

export default index;
