class MyPromise {
  constructor(optFn) {
    optFn(this.#resolve.bind(this), this.#reject.bind(this))
  }
  #state = 'pending' // 'fulfilled' 'rejected'
  #result = null
  #resolve(result) {
    if (this.#state === 'pending') {
      queueMicrotask(() => {
        this.#result = result
        this.#state = 'fulfilled'
        this.#fulfilledTask.forEach(onFulfilled => {
          onFulfilled(this.#result)
        })
      })
    }
  }
  #reject() {
    if (this.#state === 'pending') {
      this.#state = 'rejected'
      this.#rejectedTask.forEach(onRejected => {
        onRejected()
      })
    }
  }
  #fulfilledTask = []
  #rejectedTask = []
  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      if (this.#state === 'fulfilled') {
        resolve(onFulfilled(this.#result))
      }
      this.#fulfilledTask.push(() => {
        resolve(onFulfilled(this.#result))
      })
      this.#rejectedTask.push(() => {
        resolve(onRejected())
      })
    })
  }
}