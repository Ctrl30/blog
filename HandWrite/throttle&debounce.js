/*
  节流：在指定时间内只执行一次，比如在 0 ～ 500ms 内，不管事件是在第 0 ms 执行，还是第 500ms 执行，都只执行一次

  分析：在指定时间内只执行一次，传入需要执行的函数 fn 和 指定的时间 time
  1、先初始化时间，pre = 0
  2、返回一个闭包，需要将当前时间保存起来
  3、在什么时候执行函数呢，在 Date.now() - pre > time 时执行函数
  4、再更新时间
*/
function throttle(fn, time) {
  // 上一次执行 fn 的时间
  let pre = 0;

  // 将 throttle 处理结果当作函数返回
  return function(...args) {

    // 将当前时间和上一次执行函数的时间进行对比
    // 大于等待时间就把 pre 设置为当前时间并执行函数 fn
    if (Date.now() - pre > time) {
      pre = Date.now();
      fn.apply(this, args);
    }
  }
}


/*
  防抖：每过一段时间后执行一次

  分析：使用 setTimeout 将事件执行放入队列中，每过指定时间后才执行，传入需要执行的函数 fn 和 指定的时间 time
*/
function debounce(fn, time) {
  // 缓存一个定时器id
  let timer = 0;

  // 将 debounce 处理结果当作函数返回
  // 触发事件回调时执行这个返回函数
  return function (...args) {
    // 如果已经设定过定时器就清空上一次的定时器
    if (timer) clearTimeout(timer);

    // 开始设定一个新的定时器，定时器结束后执行传入的函数 fn
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, time);
  }
}

// test

const throttleFn = throttle(() => console.log('throttle -> fn 函数执行了'), 1000)
// 每 10 毫秒执行一次 throttleFn 函数
setInterval(throttleFn, 10);


const debounceFn = debounce(() => console.log('debounce -> fn 函数执行了'), 1000)
// 每 10 毫秒执行一次 debounceFn 函数
document.addEventListener('scroll', debounceFn);