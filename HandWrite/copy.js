/* 
  浅拷贝：复制了地址引用，彼此之间操作相互影响
*/

/* 
  slice方法返回一个新的数组对象，这一对象是一个由 begin和 end（不包括end）决定的原数组的浅拷贝
*/
let a = [1, 2, 3, 4, [5, 6]];
let b = a.slice();
console.log(b);       // [1, 2, 3, 4, [5, 6]]
console.log(a === b); // false

b[0] = 9;
console.log(b);  // [9, 2, 3, 4, [5, 6]]
console.log(a);  // [1, 2, 3, 4, [5, 6]] 这里改变 b，a 并没有改变

a[4][0] = 0;
console.log(b);  // [9, 2, 3, 4, [0, 6]]  这里改变 a[4][0] 后，b[4][0] 也改变
console.log(a);  // [1, 2, 3, 4, [0, 6]]

/* 
  concat
*/
let c = [1, 2, 3, [5, 6]];
let d = c.concat();
console.log(c === d);   // false
c[0] = 4;
console.log(c);   // [4, 2, 3, [5, 6]]
console.log(d);   // [1, 2, 3, [5, 6]]
c[3][1] = 8;
console.log(c);   // [4, 2, 3, [5, 8]]
console.log(d);   // [1, 2, 3, [5, 8]]   a改变第二层，b也改变了，浅拷贝

/* 
  Object.assign
*/
let obj = {
  name: 'jxl',
  age: 26,
  a: {
    c: 1
  }
}
let obj1 = Object.assign({}, obj);
console.log(obj === obj1);   // false
obj.name = 'Jack';
console.log(obj);    // {name: 'Jack', age: 26, a: {c: 1}}
console.log(obj1);   // {name: 'jxl', age: 26, a: {c: 1}}
obj.a.c = 2;         // {name: 'Jack', age: 26, a: {c: 2}}
obj1.a.c = 2;        // {name: 'jxl', age: 26, a: {c: 2}}  改变obj第二层，obj1第二层也改变了，浅拷贝


/* 
  深拷贝：在堆中重新分配内存空间，地址不同，值操作互不影响
*/

/* 
  JSON.stringify() 对象序列化和 JSON.parse() 对象反序列化

  问题：

  1、会忽略 undefined
  2、会忽略 symbol
  3、不能序列化函数
  4、不能解决循环引用的对象
  5、不能正确处理new Date()
  6、不能处理正则
*/
let person = {
  name: 'jxl',
  age: 26,
  friend: {
    name: 'Jack',
    age: 18
  }
};
let person1 = JSON.parse(JSON.stringify(person));
person.friend.name = 'Rose';
console.log(person);  // friend.name值改变
console.log(person1); // friend.name值未变，深拷贝

// JSON.stringify test
let info = {
  name: 'jxl',
  a: undefined,
  b: Symbol('jxl'),
  c: function() {}
}
console.log(info);
/* 
  {
    name: "jxl", 
    a: undefined, 
    b: Symbol(jxl), 
    c: ƒ ()
  }
*/

let name = JSON.parse(JSON.stringify(info));
console.log(name);
// {name: "jxl"}

// deepCopy

function deepCopy(obj) {
  if(!obj || typeof obj !== 'object') return;

  let targetObj = Array.isArray(obj) ? [] : {};  // 判断是对象还是数组

  // 只对对象自有属性进行拷贝，不对原型属性拷贝
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (obj[key] && typeof obj[key] === 'object') {
        targetObj[key] = deepCopy(obj[key]);
      } else {
        targetObj[key] = obj[key];
      }
    }
  }
  return targetObj;
}

// deepCopy test

const info = {
  name: 'jxl',
  age: 18,
  child: {
    name: 'Leon',
    age: 6
  }
};

const infoCopy = deepCopy(info);

infoCopy.child.age = 8;
// console.log('infoCopy', infoCopy);
console.log('info', info);