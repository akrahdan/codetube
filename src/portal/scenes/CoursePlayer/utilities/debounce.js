export function debounce(fn, millis) {
    let timer
    return (...args) => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => fn(...args), millis)
    }
  }
  