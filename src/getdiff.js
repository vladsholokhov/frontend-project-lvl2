import _ from 'lodash';

const getDiff = (fileOneContent, fileTwoContent) => {
  const keys1 = Object.keys(fileOneContent);
  const keys2 = Object.keys(fileTwoContent);
  const uniqSortedKeys = _.sortBy(_.uniq([...keys1, ...keys2]));

  const buildDiffTree = (fileContent1, fileContent2, key) => {
    const objOneHasKey = _.has(fileContent1, key);
    const objTwoHasKey = _.has(fileContent2, key);

    const objOneValue = fileContent1[key];
    const objTwoValue = fileContent2[key];

    if (!objTwoHasKey) {
      return { name: key, status: 'removed', value: objOneValue };
    }

    if (!objOneHasKey) {
      return { name: key, status: 'added', value: objTwoValue };
    }

    if (_.isObject(objOneValue) && _.isObject(objTwoValue)) {
      return { name: key, status: 'nested', children: getDiff(objOneValue, objTwoValue) };
    }
    if (objOneValue !== objTwoValue) {
      return {
        name: key, status: 'modified', previousValue: objOneValue, currentValue: objTwoValue,
      };
    }

    return { name: key, status: 'unchanged', value: objOneValue };
  };

  return uniqSortedKeys.map((key) => buildDiffTree(fileOneContent, fileTwoContent, key));
};

export default getDiff;
