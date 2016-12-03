'use strict';

module.exports = function getIcon (resource_item) {
  var iconType;

  if (resource_item.split('.').pop().toLowerCase() === 'pdf') {
    iconType = "description";
  }else if (resource_item.includes("youtube")) {
    iconType = "video_library";
  }else if (resource_item.startsWith("http") && !(resource_item.includes("youtube"))) {
    iconType = "library_books";
  }else {
    iconType = "class";
  }

  return iconType;
};
