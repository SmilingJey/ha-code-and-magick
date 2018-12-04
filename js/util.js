'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    getNextArrayItem: function (arr, item) {
      var currentIndex = arr.indexOf(item);
      var nextIndex = currentIndex < arr.length - 1 ? currentIndex + 1 : 0;
      return arr[nextIndex];
    },
    getRandomItem: function (arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    },
    getMaxItem: function (arr) {
      var maxElement = arr[0];
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] > maxElement) {
          maxElement = arr[i];
        }
      }
      return maxElement;
    }
  };
})();
