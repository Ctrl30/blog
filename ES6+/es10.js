// 一、数组实例方法：flat() , flatMap()

/* 
  flat(deep) 会按照一个指定深度 deep 拉平多维的嵌套数组，deep 默认为 1，并且返回一个新数组 
*/

let flatArr = [1, 2, 3, [4, 5, 6, [7, 8, 9, [10, 11, 12]]]];
flatArr.flat();          // [1, 2, 3, 4, 5, 6, [7, 8, 9, [10, 11, 12]]]
flatArr.flat().flat();   // 支持链式调用  [1, 2, 3, 4, 5, 6, 7, 8, 9, [10, 11, 12]]
flatArr.flat(3);         // 指定一个深度  [1, 2, 3, 4, 5, 6, 7, 8, 9, [10, 11, 12]]
flatArr.flat(Infinity);  // 参数为 Infinity 直接转为一维 [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

/* 
  flatMap(fn) 是对数组每一个成员执行一个函数 fn，返回一个新数组
  第一个参数是函数 fn ，fn 的参数是当前数组成员
  第二个参数是当前数组成员的下标 index
  第三个参数是原数组
*/

let flatMapArr = [2, 3, 4];
/* 
  下面的参数 fn 的执行过程是：
  1、遍历当前数组，对数组当前成员 x 进行操作，将 x 转为 [x, x * 2]，即如果成员是 2，就转为 [2, 2 * 2] -> [2, 4]
  2、所以经过 fn 函数执行后的结果是 [[2, 4], [3, 6], [4, 8]]
  3、再对结果进行 flat() 操作拉平数组，但默认只能拉平一层
*/
flatMapArr.flatMap(x => [x, x * 2]);   // [2, 4, 3, 6, 4, 8]
flatMapArr.flatMap(x => [[x * 2]]);    // 经过 fn 操作后是 [[[4]], [[6]], [[8]]]，因为只能拉平一层，所以结果是 [[4], [6], [8]]


// 二、对象方法：Object.entries() , Object.fromEntries()

/* 
  Object.entries(obj) 将对象转为数组
*/

let entryArr = { name: 'jxl', age: 18 };
Object.entries(entryArr);          // [["name", "jxl"], ["age", 18]]

/* 
  Object.fromEntries(obj) 是将数组转为对象
*/

let fromEntryArr = [['name', 'jxl'], ['age', 18]];
Object.fromEntries(fromEntryArr);   // {name: "jxl", age: 18}


// 三、字符串正则匹配方法：String.prototype.matchAll()

/* 
  String.prototype.matchAll() 可以一次性取出字符串所有匹配项，返回一个遍历器，不是数组
*/

let str = 'hello world';
str.match('l');   // match 方法只能匹配第一个
str.match(/l/g);  // 通过正则取出所有匹配项  ["l", "l", "l"]
/* matchAll 返回的是遍历器，所以使用 for of 取出值 */
for (const match of str.matchAll('l')) {
  console.log(match);
}

// 四、删除字符串空格：String.trimStart() , String.trimEnd()

/* 
  trimStart() 方法删除开头空格
  trimEnd()   方法删除结尾空格
  都返回一个新的字符串
*/

let trimStr = '  hello  ';
trimStr.trimStart();   // 'hello  '
trimStr.trimEnd();     // '  hello'


// 五、Symbol.prototype.description

/* 
  创建 Symbol 可以添加一个描述，description 属性可以取出这个描述值
*/
let sym = Symbol('hello');
sym.description;   // 返回一个只读的描述值  'hello'


// 六、Array.prototype.sort() 排序稳定性

/* 
  排序稳定性指排序关键字相同的项，排序前后的顺序不变
*/

let sortObj = [
  { name: 'jxl', age: '16'},
  { name: 'shq', age: '16'},
  { name: 'Leon', age: '14'},
  { name: 'Senwell', age: '18'}
];
sortObj.sort((a, b) => a.age - b.age);
/* 
[
  {name: "Leon", age: "14"}
  {name: "jxl", age: "16"}
  {name: "shq", age: "16"}
  {name: "Senwell", age: "18"}
]
*/


// 七、Function.prototype.toString()

/* 
  toString() 方法原来存在于 Object.prototype.toString() 上，现在为 Function.prototype 增加了 toString() 方法。
  Function.prototype.toString() 会返回函数本身
*/
function fn() {}
fn.toString();   // "function fn() {}"


// 八、catch 命令的参数省略

/* 
  catch 无需再跟 err 参数，可以直接在 catch 里处理错误
*/

try {
  fn();
} catch {
  console.log('hello');  // 'hello'
}


// 九、BigInt - 新的数据类型

/* 
  JS 只能表示 -(2^53-1)至 2^53 范围的值，即 Number.MIN_SAFE_INTEGER 至 Number.MAX_SAFE_INTEGER，-9007199254740992 ~ 9007199254740992
  超过这个范围就用 Infinity 表示
*/
2 ** 1024;     // Infinity
2 ** 53 === 2 ** 53 + 1;   // true

/* 
  BigInt 是第 7 个数据类型，创建一个 BigInt 类型有两种方法：
*/

let big = BigInt(123);   // 使用 BigInt 构造函数
let big1 = 234n;         // 在数值后添加后缀 n
typeof big;              // bigint
typeof big1;             // bigint

big + big1;              // 357n

1234569007199254740992n * 1234156n;  // 1523650747649003434123722752n


// 十、动态导入 - import()

/* 
  import() 支持动态加载模块，返回一个 Promise 对象，可以在按需加载和条件加载中使用
*/

// 按需加载
element.addEventListener('click', async() => {
  const module = await import(`./button-click.js`);
  module.clickEvent();
});

// 条件加载
if (condition) {
  import('moduleA').then();
} else {
  import('moduleB').then();
}

// 同时加载多个模块
Promise.all([
  import('./module1.js'),
  import('./module2.js'),
  import('./module3.js'),
])
.then(([module1, module2, module3]) => {});



// 十一、Promise.allSettled()

/* 
  Promise.all() 方法只要一个 Promise 被 rejected 时，Promise 方法就会抛出错误
  Promise.allSettled() 方法会等所有 Promise 都执行才会返回，不管是 fulfilled 还是 rejected
*/

const promiseArr = [
  Promise.resolve(100),
  Promise.reject(new Error('Something wrong')),
  Promise.resolve('success'),
];
Promise.all(promiseArr)
  .then((data) =>
    console.log('all resolved: ', data)
  )
  .catch((err) => console.log('wrong: ', err));    // wrong:  Error: Something wrong

Promise.allSettled(promiseArr)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.log(err));
/* 
  [
    {status: "fulfilled", value: 100}
    {status: "rejected", reason: Error: Something wrong at <anonymous>:3:18}
    {status: "fulfilled", value: "success"}
  ]
*/



// 十二、globalThis 对象

/* 
  浏览器的顶层对象是 window，或者是 self；node 顶层对象是 global

  全局环境中，this 会返回顶层对象；node 和 es6 模块 this 返回是当前模块；

  即目前没有统一获取顶层对象的方法
*/

// 这种方法可以拿到，但是很麻烦
const getGlobal = function () {
  if (typeof self !== 'undefined') { return self; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  throw new Error('unable to locate global object');
};

// globalThis 就是在任何环境中都可以拿到顶层对象，而且指向全局环境下的 this
globalThis.hello = 'world';


// 十三、可选链操作符 ?.

let info = {
  name: 'jxl',
  age: 18
};

/* 
  如上对象 info，之前判断一个对象有没有一个属性是这样判断的，如果是层级很深，就需要一个个判断
*/

if (info && info.name) {}

/* 
  可选链操作如下，表示一个对象有这个属性就返回属性值，没有就返回 undefined
*/

info?.name;   // 'jxl'
info?.job;    // undefined


// 十四、空位合并操作符 ??

/* 
  用 if 判断或者三元运算符判断是否为 true
*/

let name = 'jxl';
if (name) {}
name ? name : 'Leon';

/* 
  当一个变量为 ''、false、0 时，如上判断，会把这个变量当作 false 判断，会走到 false 逻辑里
  很多时候只想判断这个变量是不是 undefined 或 null，所以 空位合并操作符 ?? 就可以
  a ?? b 只有当 a 的值为 undefined 或 null 时，才会返回 b 的值
*/

let un = undefined;
let nu = null;

let space = un ?? 'jxl';   // 'jxl'
let space1 = nu ?? 18;     // 18
