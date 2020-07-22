class MyPromise {
  static PENDING = 'pending';
  static FULILLED = 'fulfilled';
  static REJECTED = 'rejected';
  
  constructor(executor) {
    this.status = MyPromise.PENDING;
    this.value = null;  // then 的值
    this.callbacks = [];
    
    const resolve = (value) => {
      if (this.status === MyPromise.PENDING) {
        this.status = MyPromise.FULILLED;
        this.value = value;

        setTimeout(() => {
          this.callbacks.map(cb => {
            cb.onFulfilled(value);
          })
        })
      }
    };

    const reject = (reason) => {
      if (this.status === MyPromise.PENDING) {
        this.status = MyPromise.REJECTED;
        this.value = reason;

        setTimeout(() => {
          this.callbacks.map(cb => {
            cb.onRejectFn(reason);
          })
        })
      }
    };

    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(onFulfilled, onRejectFn) {
    typeof onFulfilled !== 'function' ? onFulfilled = () => this.value : null;

    typeof onRejectFn !== 'function' ? onRejectFn = () => this.value : null;

    // 对 then 方法 三种状态解析
    const parse = (promise, result, resolve, reject) => {
      // 如果 promise 和 结果相同，就抛出异常
      if (promise === result) {
        throw new TypeError('Chaining cycle detected.')
      }

      try {
        // 在这里判断返回结果是不是 promise
        if (result instanceof MyPromise) {
          result.then(resolve, reject);
        } else {
          resolve(result);
        }
      } catch (e) {
        reject(e);
      }
    };

    const promise =  new MyPromise((resolve, reject) => {

      // 准备的状态处理
      if (this.status === MyPromise.PENDING) {
        this.callbacks.push({
          onFulfilled: value => {
            // 将 promise 传给 parse 判断
            parse(promise, onFulfilled(value), resolve, reject);
          },
          onRejectFn: reason => {
            parse(promise, onRejectFn(reason), resolve, reject);
          },
        })
      }
  
      // 解决的状态处理
      if (this.status === MyPromise.FULILLED) {
        setTimeout(() => {
          parse(promise, onFulfilled(this.value), resolve, reject);
        })
      }
  
      // 拒绝的状态处理
      if (this.status === MyPromise.REJECTED) {
        setTimeout(() => {
          parse(promise, onRejectFn(this.value), resolve, reject);
        })
      }
    });

    return promise;
  }

  catch(onRejectFn) {
    return this.then(null, onRejectFn);
  }

  static resolve(value) {
    
    return new MyPromise((resolve, reject) => {
      value instanceof MyPromise ? value.then(resolve, reject) : resolve(value);
    });
  }

  static reject(reason) {
    
    return new MyPromise((resolve, reject) => reject(reason));
  }

  // 只有当所有 promise 都成功执行才返回成功的值，否则都会走到 reject
  static all(promises) {
    // 任何一个 Promise 状态，当状态失败，就改变 all 的 Promise 状态
    // 而且每一个 Promise 必须都成功返回，所以添加一个记录
    let values = [];

    return new MyPromise((resolve, reject) => {
      promises.forEach(promise => {
        promise.then(
          value => {
            // 成功的结果放入 values 中
            values.push(value);

            if (values.length === promises.length) {
              resolve(values);
            }
          },
          reason => {
            reject(reason);
          }
        )
      });
    })
  }

  // 哪一个 promise 执行的快，就执行哪个，其他的都不执行
  static race(promises) {
    return new MyPromise((resolve, reject) => {
      promises.map(promise => {
        promise.then(
          value => {
            resolve(value);
          },
          reason => {
            reject(reason);
          }
        )
      })
    })
  }

  // 无论成功或失败，都会执行回调函数
  finally(cb) {
    return this.then(
      value => MyPromise.resolve(cb()).then(() => value),
      reason => MyPromise.resolve(cb()).then(() => { throw reason })
    )
  }
}
