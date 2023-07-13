// 首先是一个类
class MyPromise {
  // 有一个构造函数
  // 构造函数接受一个函数参数
  constructor(executor) {
    // 函数会被立即执行，并且传入传入两个方法
    executor(this.#resolve.bind(this), this.#reject.bind(this))
    // 构造函数会返回一个promise
  }
  // resolve: 如果当前promise的状态是pending,将状态改为fulfilled
  #resolve(result) {
    if (this.#state === 'pending') {
      queueMicrotask(() => {
        // 将带入的结果设置为当前promise的fulfilled结果
        this.#result = result
        this.#setState('fulfilled')
      })
    }
  }
  // reject: 如果当前promise的状态是pending,将状态改为rejected
  #reject(reason) {
    if (this.#state === 'pending') {
      queueMicrotask(() => {
        // 将带入的结果设置为当前promise的rejected结果
        this.#reason = reason
        this.#setState('rejected')
      })
    }
  }
  // promise有三种状态，由pending到fulfilled或到rejected，一旦变化就不可在改变
  #state =  'pending' // 'pending' | 'fulfilled' | 'rejected'
  #setState(val) {
    if (this.#state === 'pending') {
      if (val === 'fulfilled') {
        this.#state = val

        if (this.#fulfilledTask.length) {
          this.#fulfilledTask.forEach(onFulfilled => onFulfilled(this.#result))
        }
      }
      if (val === 'rejected') {
        this.#state = val
        if (this.#rejectedTask.length) {
          this.#rejectedTask.forEach(onRejected => onRejected(this.#reason))
        }
      }
    }
  }
  // promise fulfilled的结果
  #result = null
  // promise rejected的结果
  #reason = null
  #fulfilledTask = []
  #rejectedTask = []
  then(onFulfilled, onRejected) {
    // 根据promise的状态值来决定调用哪个回调
    // 如果promise的状态是fulfilled或reject则立即调用，否则就等待promise完成
    // if (this.#state === 'pending') {
    //   this.#fulfilledTask.push(onFulfilled)
    //   this.#rejectedTask.push(onRejected)
    // } else if(this.#state === 'fulfilled') {
    //   onFulfilled(this.#result)
    // } else if(this.#state === 'rejected') {
    //   onRejected(this.#reason)
    // }
    // 返回的同样是一个promise，当不再是当前的promise
    // return this
    // promise的返回值是回调函数的返回值
    return new MyPromise((resolve, reject) => {
      if (this.#state === 'pending') {
        this.#fulfilledTask.push(() => {
          resolve(onFulfilled(this.#result))
        })
        this.#rejectedTask.push(() => {
          reject(onRejected(this.#reason))
        })
      } else if(this.#state === 'fulfilled') {
        resolve(onFulfilled(this.#result))
      } else if(this.#state === 'rejected') {
        reject(onRejected(this.#reason))
      }
    })
  }
}