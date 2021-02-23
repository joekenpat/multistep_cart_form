String.prototype.toTitleCase = function () {
  return this.replace(/(?:^|\s)\w/g, function (match) {
    return match.toUpperCase();
  });
};

const setSelectedProductId = (x, y) => {
  window[y].productId = x.value;
};
const setSelectedProductColor = (x, y) => {
  window[y].productColor = x.value;
};
const setSelectedConfigItem = (x, y) => {
  window[y].configItemId = x.value;
};
