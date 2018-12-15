'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooser = document.querySelector('.upload input[type=file]');
  var preview = document.querySelector('.setup-user-pic');
  var setupButtonIcon = document.querySelector('.setup-open-icon');

  var onFileChange = function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        preview.src = reader.result;
        setupButtonIcon.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  };

  fileChooser.addEventListener('change', onFileChange);

  var setupDragZone = function (dropbox, handleFiles) {
    var dragenter = function (e) {
      e.stopPropagation();
      e.preventDefault();
    };

    var dragover = function (e) {
      e.stopPropagation();
      e.preventDefault();
    };

    var drop = function drop(e) {
      e.stopPropagation();
      e.preventDefault();
      var dt = e.dataTransfer;
      var files = dt.files;
      if (window.pageState.getState()) {
        handleFiles(files);
      }
    };

    dropbox.addEventListener('dragenter', dragenter, false);
    dropbox.addEventListener('dragover', dragover, false);
    dropbox.addEventListener('drop', drop, false);
  };

  setupDragZone(preview, onFileChange);

})();
