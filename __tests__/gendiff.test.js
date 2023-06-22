import { test, expect } from '@jest/globals';
import path from 'path';
import { readFileSync } from 'fs';
import genDiff from '../index.js';

const getFixturePath = (filename) => path.resolve('__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const expectedPlain = readFile('expectedPlain.txt');
const expectedStylish = readFile('expectedStylish.txt');

test.each(['yaml', 'json'])('tests', (fileExtension) => {
  const path1 = getFixturePath(`file1.${fileExtension}`);
  const path2 = getFixturePath(`file2.${fileExtension}`);

  const testDefault = genDiff(path1, path2);
  expect(testDefault).toEqual(expectedStylish);
  const testPlain = genDiff(path1, path2, 'plain');
  expect(testPlain).toEqual(expectedPlain);
  const testStylish = genDiff(path1, path2, 'stylish');
  expect(testStylish).toEqual(expectedStylish);
  const data = genDiff(path1, path2, 'json');
  expect(() => JSON.parse(data)).not.toThrow();
});
