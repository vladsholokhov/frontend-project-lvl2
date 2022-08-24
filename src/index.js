import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const getFilePath = ( file ) => path.resolve(process.cwd(), `fixtures`, file);
const readFile = ( filePath ) => fs.readFileSync(filePath, 'utf-8');

const genDiff = ( file1, file2 ) => {
    const fileOneContent = JSON.parse(readFile(getFilePath(file1)));
    const fileTwoContent = JSON.parse(readFile(getFilePath(file2)));

    const keys1 = Object.keys(fileOneContent);
    const keys2 = Object.keys(fileTwoContent);
    const uniqSortedKeys = _.sortBy(_.uniq([...keys1, ...keys2]));

    const result = uniqSortedKeys.map(( key ) => {
        if (fileOneContent.hasOwnProperty(key) && !fileTwoContent.hasOwnProperty(key)) {
            return ` - ${key}: ${fileOneContent[key]}\n`;
        }

        if (!fileOneContent.hasOwnProperty(key) && fileTwoContent.hasOwnProperty(key)) {
            return ` + ${key}: ${fileTwoContent[key]}\n`;
        }

        if (fileOneContent.hasOwnProperty(key) && fileTwoContent.hasOwnProperty(key)) {
            if (fileOneContent[key] === fileTwoContent[key]) {
                return `   ${key}: ${fileTwoContent[key]}\n`;
            }
            else {
                return ` - ${key}: ${fileOneContent[key]}\n + ${key}: ${fileTwoContent[key]}\n`;
            }
        }
    });

    console.log(`{\n${result.toString().replaceAll(',', '')}}`);

};

export default genDiff;
