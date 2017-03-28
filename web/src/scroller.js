export default callback => {
  window.addEventListener("scroll", e => {
    var doc = document.documentElement;
    var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    var bottom = doc.clientHeight + top;
    var remaining = doc.scrollHeight - bottom;

    if (remaining < 400) {
      callback(remaining);
    }
    // console.log(doc.scrollHeight - top, doc.clientHeight);
  });
};
