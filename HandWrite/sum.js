// 大数相加
function sumBigNum(a, b) {
  let res = '';
  let temp = 0;

  a = a.toString().split('');  // 将字符串转成数组
  b = b.toString().split('');

  /*
  例子：
  a: ['3', '6', '7']
  b: ['4', '8', '2']

  ~~将字符串转成数字

  while (a.length || b.length) {
    temp = 0 + ~~'7' + ~~'2';  // temp = 9
    res = 9 % 10 + '';         // res = '9'
    temp = 9 > 9;              // false
  }
  // 第一轮 temp = false;  res = '9'

   while (a.length || b.length) {
    temp = false + ~~'6' + ~~'8';     // temp = 14
    res = 14 % 10 + '9';              // res = '49'
    temp = 14 > 9;                    // true
  }
  // 第二轮 temp = true;  res = '49'

  while (a.length || b.length) {
    temp = true + ~~'3' + ~~'4';       // temp = 8
    res = 8 % 10 + '49';               // res = '849'
    temp = 8 > 9;                      // false
  }
  // 第三轮 temp = false;  res = '849'

  a.length || b.length || temp 都为 false 返回

  res = '849'

  所以 temp 的作用是，当 相加和大于 9 时，向下一轮进一位，小时候学加法时，就有满 10 进一位的概念
  */

  while (a.length || b.length || temp) {
    // ~~ 向下取整
    // 这里使用 ~~ 是为了解决 ~~undefined === 0，因为 [].pop() === undefined
    temp += ~~a.pop() + ~~b.pop();

    res = temp % 10 + res;
    temp = temp > 9;
  }

  return res.replace(/^0+/, '');
}

/*
  超小数求和得到的结果并不准确，0.1 + 0.2 != 0.3
  思路：转换成整数求和后再转成小数
*/
function sumNum(num1, num2) {
  let sq1;
  let sq2;

  try {
    // 如果这个数是小数，就取小数的位数
    sq1 = num1.toString().split('.')[1].length;
  } catch (e) {
    // 不是小数，小数位数就是 0
    sq1 = 0;
  }

  try {
    sq2 = num2.toString().split('.')[1].length;
  } catch (e) {
    sq2 = 0;
  }

  // 取两个数，小数位多的那个数
  // 比如是 0.23 和 0.342， m = 10 ** 3
  const m = Math.pow(10, Math.max(sq1, sq2));  // 或着 10 ** Math.max(sq1, sq2)

  // 将小数转成整数进行相加
  // 进行 toFixed 操作会转成字符串
  const sum = ((num1 * m + num2 * m) / m).toFixed(8);
  // 转成数字，但是转成数字会将小数位为 0 的都去掉
  return Number(sum);
}

// test
console.log(sumBigNum(367, 482));

console.log(sumNum(0.11, 0.2));

// 小数求和还有个简单方法是，参数是保留的小数位数 toPrecision(6)
console.log((0.1 + 0.2).toPrecision(6));