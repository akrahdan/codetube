export default (function () {
  return typeof window === 'undefined' || !!window.SSRtest;
});