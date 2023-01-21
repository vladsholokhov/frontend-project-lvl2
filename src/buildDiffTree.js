import _ from 'lodash';

const buildDiffTree = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const uniqSortedKeys = _.sortBy(_.uniq([...keys1, ...keys2]));

  const buildTree = (obj1, obj2, key) => {
    const objOneHasKey = _.has(obj1, key);
    const objTwoHasKey = _.has(obj2, key);

    const objOneValue = obj1[key];
    const objTwoValue = obj2[key];

    if (!objTwoHasKey) {
      return { name: key, status: 'removed', value: objOneValue };
    }

    if (!objOneHasKey) {
      return { name: key, status: 'added', value: objTwoValue };
    }

    if (_.isObject(objOneValue) && _.isObject(objTwoValue)) {
      return { name: key, status: 'nested', children: buildDiffTree(objOneValue, objTwoValue) };
    }
    if (objOneValue !== objTwoValue) {
      return {
        name: key, status: 'modified', previousValue: objOneValue, currentValue: objTwoValue,
      };
    }

    return { name: key, status: 'unchanged', value: objOneValue };
  };

  return uniqSortedKeys.map((key) => buildTree(data1, data2, key));
};

export default buildDiffTree;
