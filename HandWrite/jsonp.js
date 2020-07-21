// 将参数对象转成字符串
function objectToQuery(obj) {
  let queryList = [];

  for (let i in obj) {
    queryList.push(encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]));
  }

  return queryList.join('&');
}

function jsonp({url, params}) {
  return new Promise((resolve, reject) => {
    // 手动创建一个 script，插入到 body 后面
    let script = document.createElement('script');

    // 防止函数名冲突
    let fnName = `jsonp${new Date().getTime()}`;
    
    // 创建一个全局回调函数
    // 数据请求回来之后，会执行这个函数，触发 resolve，完成使命，移除这个 script 标签
    // 继而执行 then 中定义的回调函数
    window[fnName] = function (data) {
      resolve(data);

      // 清除本次请求产生的回调函数和script标签
      // 清除回调函数和 script 标签是为了回收不再使用变量和元素，防止内存泄露
      delete window[fnName];
      document.body.removeChild(script);
    }
    
    script.src = `${url}?${objectToQuery(params)}&callback=${fnName}`;
    document.body.appendChild(script);
  })
}

jsonp({
  url: 'https://wis.qq.com/weather/common?source=pc&weather_type=observe%7Cforecast_1h%7Cforecast_24h%7Cindex%7Calarm%7Climit%7Ctips%7Crise&province=浙江&city=杭州&county=余杭区', 
})
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });