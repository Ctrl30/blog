// 数组扁平化

function flatten(arr) {
  return arr.reduce((target, current) => {
    return Array.isArray(current) ? target.concat(flatten(current)) : target.concat(current)
  }, []);
}

function flattenByDeep(arr, deep = 1) {
  return arr.reduce((target, current) => {
    return Array.isArray(current) && deep > 1 ? target.concat(flattenByDeep(current, deep - 1)) : target.concat(current)
  }, []);
}

// test

const arr1 = [1, 2, 3, [4, 5, 6, [7, 8, 9, [10, 11, 12]]]];
console.log(flatten(arr1));

const arr2 = [1, 2, 3, [4, 5, 6, [7, 8, 9, [10, 11, 12]]]];
console.log(flattenByDeep(arr2, 1));