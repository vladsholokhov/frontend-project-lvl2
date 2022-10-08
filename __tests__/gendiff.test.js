import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const stylishExpected = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

const plainExpected = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

const jsonExpected = '[{"name":"common","status":"nested","children":[{"name":"follow","status":"added","value":false},{"name":"setting1","status":"unchanged","value":"Value 1"},{"name":"setting2","status":"removed","value":200},{"name":"setting3","status":"modified","oldValue":true,"newValue":null},{"name":"setting4","status":"added","value":"blah blah"},{"name":"setting5","status":"added","value":{"key5":"value5"}},{"name":"setting6","status":"nested","children":[{"name":"doge","status":"nested","children":[{"name":"wow","status":"modified","oldValue":"","newValue":"so much"}]},{"name":"key","status":"unchanged","value":"value"},{"name":"ops","status":"added","value":"vops"}]}]},{"name":"group1","status":"nested","children":[{"name":"baz","status":"modified","oldValue":"bas","newValue":"bars"},{"name":"foo","status":"unchanged","value":"bar"},{"name":"nest","status":"modified","oldValue":{"key":"value"},"newValue":"str"}]},{"name":"group2","status":"removed","value":{"abc":12345,"deep":{"id":45}}},{"name":"group3","status":"added","value":{"deep":{"id":{"number":45}},"fee":100500}}]';

test('check json files - stylish', () => {
  expect(genDiff('file1.json', 'file2.json')).toEqual(stylishExpected);
});

test('check yaml files - stylish', () => {
  expect(genDiff('file1.yaml', 'file2.yaml')).toEqual(stylishExpected);
});

test('check json files - plain', () => {
  expect(genDiff('file1.json', 'file2.json', 'plain')).toEqual(plainExpected);
});

test('check yaml files - plain', () => {
  expect(genDiff('file1.yaml', 'file2.yaml', 'plain')).toEqual(plainExpected);
});

test('check json files - json', () => {
  expect(genDiff('file1.json', 'file2.json', 'json')).toEqual(jsonExpected);
});

test('check yaml files - json', () => {
  expect(genDiff('file1.yaml', 'file2.yaml', 'json')).toEqual(jsonExpected);
});
