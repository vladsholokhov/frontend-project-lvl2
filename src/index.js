import fs from 'fs';
import path from 'path';

const getFilePath = (file) => path.resolve(process.cwd(), `fixtures`, file);
const readFile = (filePath) => fs.readFileSync(filePath, 'utf-8');

const genDiff = (file1, file2) => {
    const fileOne = JSON.parse(readFile(getFilePath(file1)));
    const fileTwo = JSON.parse(readFile(getFilePath(file2)));


    console.log(fileOne);
    console.log(fileTwo);
};

export default genDiff;
