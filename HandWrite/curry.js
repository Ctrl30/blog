function curry(fn, ...args) {
  if(args.length >= fn.length) {
    return fn(...args);
  } else {
    return (...args2) => curry(fn, ...args, ...args2);
  }
}

// test

function sum (a, b, c) {
  return a + b + c;
}

const curryFn = curry(sum);
console.log(curryFn(1, 2, 3));
console.log(curryFn(1, 2)(3));
console.log(curryFn(1)(2)(3));
console.log(curryFn(1)(2, 3));