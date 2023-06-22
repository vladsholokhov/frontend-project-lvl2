import _ from 'lodash';

const buildDiffTree = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const uniqSortedKeys = _.sortBy(_.uniq([...keys1, ...keys2]));

  const buildTree = (obj1, obj2, key) => {
    if (!_.has(obj1, key)) {
      return { name: key, type: 'removed', value: obj1[key] };
    }

    if (!_.has(obj2, key)) {
      return { name: key, type: 'added', value: obj2[key] };
    }

    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { name: key, type: 'nested', children: buildDiffTree(obj1[key], obj2[key]) };
    }
    if (obj1[key] !== obj2[key]) {
      return {
        name: key, type: 'modified', previousValue: obj1[key], currentValue: obj2[key],
      };
    }

    return { name: key, type: 'unchanged', value: obj1[key] };
  };

  return uniqSortedKeys.map((key) => buildTree(data1, data2, key));
};

export default buildDiffTree;
