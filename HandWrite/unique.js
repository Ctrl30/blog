// 数组去重

const arr = [2, 4, 3, 4, 'a', 'c', 'a', 5, 2, 6];

// 使用 set
function uniqueSet(arr) {
  return [...new Set(arr)];
}

// 使用 filter
function uniqueFilter(arr) {
  return arr.filter((item, index, array) => array.indexOf(item) === index);
}

/*
  reduce 接收两个参数：
  1、函数(initVal, curVal, curIndex, array)  
    - initVal: 初始值
    - curVal: 当前值
    - curIndex: 当前值下标
    - array: 原数组
  2、initVal: 函数第一个参数的初始值
*/
function uniqueReduce(arr) {
  // 这里 reduce 函数只有 两个参数，并设置第一个参数的初始值为 []
  return arr.reduce((pre, cur) => {

    // 如果 pre 里没有当前值，就将这个值添加到 pre
    !pre.includes(cur) && pre.push(cur);
    // 返回 pre
    return pre;
  }, []);
}

// 对象数组去重

const arrObj = [
  { id: 1, name: '1' },
  { id: 2, name: '2' },
  { id: 3, name: '3' },
  { id: 2, name: '2' },
  { id: 1, name: '1' },
  { id: 4, name: '4' },
];

/*
  find 方法为数组中每个元素都调用一个函数，当条件返回 true 时，返回符合条件的元素，之后的值不会再调用此函数，没有符合则返回 undefined
*/

function uniqueObj(arr, key) {

  return arr.reduce((pre, cur) => {
    !pre.find((item) => item[key] === cur[key]) && pre.push(cur);

    return pre;
  }, []);
}

// test

console.log(uniqueReduce(arr));

console.log(uniqueObj(arrObj, 'id'));