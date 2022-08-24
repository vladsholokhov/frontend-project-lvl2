import { test, expect } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const getFilePath = (file) => path.resolve(process.cwd(), '__fixtures__', file);
const readFile = (filePath) => fs.readFileSync(filePath, 'utf-8');

test('check json files', () => {
  expect(genDiff('file1.json', 'file2.json')).toEqual(readFile(getFilePath('expected.txt')));
});
