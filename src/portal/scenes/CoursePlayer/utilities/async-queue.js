export function asyncQueue() {
    const fnQueue = []
    let working = false
  
    return async fn => {
      fnQueue.push(fn)
      if (working) return fnQueue.length
      working = true
  
      let currentFn
  
      while(currentFn = fnQueue.shift()) {
        await currentFn()
      }
      
      working = false
      return fnQueue.length
    }
  }