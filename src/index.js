import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const getFilePath = (file) => path.resolve(process.cwd(), '__fixtures__', file);
const readFile = (filePath) => fs.readFileSync(filePath, 'utf-8');

const genDiff = (file1, file2) => {
  const fileOneContent = JSON.parse(readFile(getFilePath(file1)));
  const fileTwoContent = JSON.parse(readFile(getFilePath(file2)));

  const keys1 = Object.keys(fileOneContent);
  const keys2 = Object.keys(fileTwoContent);
  const uniqSortedKeys = _.sortBy(_.uniq([...keys1, ...keys2]));

  const resultArr = uniqSortedKeys.map((key) => {
    const objOneHasKey = _.has(fileOneContent, key);
    const objTwoHasKey = _.has(fileTwoContent, key);

    const objOneValue = fileOneContent[key];
    const objTwoValue = fileTwoContent[key];

    if (objOneHasKey && !objTwoHasKey) {
      return ` - ${key}: ${objOneValue}\n`;
    }

    if (!objOneHasKey && objTwoHasKey) {
      return ` + ${key}: ${objTwoValue}\n`;
    }

    if (objOneHasKey && objTwoHasKey) {
      if (objOneValue === objTwoValue) {
        return `   ${key}: ${objOneValue}\n`;
      }
    }

    return ` - ${key}: ${objOneValue}\n + ${key}: ${objTwoValue}\n`;
  });

  const resultStr = resultArr.toString().replaceAll(',', '');

  console.log(`{\n${resultStr}}`);

  return `{\n${resultStr}}\n`;
};

export default genDiff;
