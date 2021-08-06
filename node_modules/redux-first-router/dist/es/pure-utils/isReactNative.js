export default (function () {
  return typeof window !== 'undefined' && typeof window.navigator !== 'undefined' && window.navigator.product === 'ReactNative';
});