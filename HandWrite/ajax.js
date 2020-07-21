function fecth(url, method = 'GET') {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.onreadystatechange = () => {
      if(this.readyState === 4 && this.status === 200) {
        resolve(this.responseText);
      } else {
        reject(new Error(this.status));
      }
    };
    xhr.send(null);
  })
}

fetch({
  url: 'https://wis.qq.com/weather/common?source=pc&weather_type=observe%7Cforecast_1h%7Cforecast_24h%7Cindex%7Calarm%7Climit%7Ctips%7Crise&province=浙江&city=杭州&county=余杭区', 
})
  .then( value => {
    console.log(value);
  })
  .catch( err => {
    console.log(err)
  })