Function.prototype.myCall = function(context, ...args) {
  // 这里要用 Object 将 context 包装成包装函数
  context = context ? Object(context) : window;
  context.fn = this;
  const result = context.fn(...args);

  delete context.fn;
  return result;
}

Function.prototype.myApply = function(context, args) {
  // 这里要用 Object 将 context 包装成包装函数
  context = context ? Object(context) : window;
  context.fn = this;
  let result;

  if (args) {
    result = context.fn(...args);
  } else {
    result = context.fn();
  }

  delete context.fn;
  return result;
}

Function.prototype.myBind = function(context, ...args) {

  if (typeof this !== 'function') {
    throw new TypeError('Error');
  }

  const _this = this;
  
  // 这里返回一个闭包，上面将 this 值缓存起来
  // 缓存 this 是因为在 闭包中，this 会指向 window
  return function F() {

    // 因为返回了一个函数，可以执行 new F()，需要判断
    if (this instanceof F) {
      return new _this(...args, ...arguments);
    }
    return _this.apply(context, args.concat(...arguments));
  }
}

// test

// 1、求数组最大最小值
let arr = [1, 3, 5, 3, 6, 9];
console.log(Math.max.myCall(Math, ...arr));

console.log(Math.min.myApply(Math, arr));

console.log(Math.max.myBind(Math, ...arr)());

// 2、合并两个数组
let arr1 = [1, 2, 3], arr2 = [4, 5, 6];
[].push.myCall(arr1, ...arr2);
console.log(arr1);
console.log(arr2);

[].push.myApply(arr2, arr1);
console.log(arr2);

[].push.myBind(arr, ...arr1)();
console.log(arr);


// 2、判断变量类型
function isArray(obj) {
  console.log(Object.prototype.toString.myCall(obj) === '[object Array]');
  console.log(Object.prototype.toString.myApply(obj) === '[object Array]');
  console.log(Object.prototype.toString.myBind(obj)() === '[object Array]');
}
isArray([]);
isArray('jxl');