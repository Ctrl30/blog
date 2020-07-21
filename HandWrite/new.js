function create1() {
	// 创建一个空的对象
  let obj = new Object(),
	// 获得构造函数，arguments中去除第一个参数
  Con = [].shift.call(arguments);
	// 链接到原型，obj 可以访问到构造函数原型中的属性
  obj.__proto__ = Con.prototype;
	// 绑定 this 实现继承，obj 可以访问到构造函数中的属性
  Con.apply(obj, arguments);
	// 返回对象
  return obj;
};

// obj.__proto__ = Con.prototype; 操作比较耗性能

function create() {
  // 1、获得构造函数，同时删除 arguments 中第一个参数
  let Con = [].shift.call(arguments);
  // 2、创建一个空的对象并链接到原型，obj 可以访问构造函数原型中的属性
  let obj = Object.create(Con.prototype);
  // 3、绑定 this 实现继承，obj 可以访问到构造函数中的属性
  const ret = Con.apply(obj, arguments);

  // 4、优先返回构造函数返回的对象
  return ret instanceof Object ? ret : obj;
}

// test

function Car(color) {
  this.color = color;
}
Car.prototype.start = function() {
  console.log(this.color + " car start");
}

const car = create(Car, "black");
console.log(car.color);

car.start();