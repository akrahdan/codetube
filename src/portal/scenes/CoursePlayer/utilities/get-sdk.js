import loadScript from 'load-script'

// Util function to load an external SDK
// or return the SDK if it is already loaded
const resolves = {}
export function getSDK (url, sdkGlobal, sdkReady = null, isLoaded = () => true, fetchScript = loadScript) {
  if (window[sdkGlobal] && isLoaded(window[sdkGlobal])) {
    return Promise.resolve(window[sdkGlobal])
  }
  return new Promise((resolve, reject) => {
    // If we are already loading the SDK, add the resolve
    // function to the existing array of resolve functions
    if (resolves[url]) {
      resolves[url].push(resolve)
      return
    }
    resolves[url] = [resolve]
    const onLoaded = sdk => {
      // When loaded, resolve all pending promises
      resolves[url].forEach(resolve => resolve(sdk))
    }
    if (sdkReady) {
      const previousOnReady = window[sdkReady]
      window[sdkReady] = function () {
        if (previousOnReady) previousOnReady()
        onLoaded(window[sdkGlobal])
      }
    }
    fetchScript(url, err => {
      if (err) reject(err)
      if (!sdkReady) {
        onLoaded(window[sdkGlobal])
      }
    })
  })
}