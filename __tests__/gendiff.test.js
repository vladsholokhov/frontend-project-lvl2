import { test, expect } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const getFilePath = (file) => path.resolve(process.cwd(), '__fixtures__', file);
const readFile = (filePath) => fs.readFileSync(filePath, 'utf-8');

test('check json files - stylish', () => {
  expect(genDiff('file1.json', 'file2.json')).toEqual(readFile(getFilePath('expectedStylish.txt')));
});

test('check yaml files - stylish', () => {
  expect(genDiff('file1.yaml', 'file2.yaml')).toEqual(readFile(getFilePath('expectedStylish.txt')));
});

test('check json files - plain', () => {
  expect(genDiff('file1.json', 'file2.json', 'plain')).toEqual(readFile(getFilePath('expectedPlain.txt')));
});

test('check yaml files - plain', () => {
  expect(genDiff('file1.yaml', 'file2.yaml', 'plain')).toEqual(readFile(getFilePath('expectedPlain.txt')));
});
