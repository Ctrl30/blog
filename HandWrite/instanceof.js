function instance(left, right) {
  // 获得类型得原型
  let prototype = right.prototype;

  // 获得对象得类型
  left = left.__proto__;

  // 判断对象得类型是否等于类型的原型
  while (true) {
    if (left === null) return false;

    if (left === prototype) return true;

    left = left.__proto__;
  }
}

// test

console.log(instance([1, 2, 3], Array));