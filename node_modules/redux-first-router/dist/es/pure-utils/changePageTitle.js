

export default (function (doc, title) {
  if (typeof title === 'string' && doc.title !== title) {
    return doc.title = title;
  }

  return null;
});


export var getDocument = function getDocument() {
  var isSSRTest = process.env.NODE_ENV === 'test' && typeof window !== 'undefined' && window.isSSR;

  return typeof document !== 'undefined' && !isSSRTest ? document : {};
};