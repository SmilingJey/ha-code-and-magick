'use strict';

(function () {
  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

  var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

  window.mockWizard = {

    generateMockWizard: function () {
      var mockWizard = {
        name: window.util.getRandomItem(NAMES) + ' ' + window.util.getRandomItem(SURNAMES),
        coatColor: window.util.getRandomItem(window.GameConstants.COAT_COLORS),
        eyesColor: window.util.getRandomItem(window.GameConstants.EYES_COLORS)
      };
      return mockWizard;
    },

    generateMockWizards: function (count) {
      var wizards = [];
      for (var i = 0; i < count; i++) {
        wizards.push(window.mockWizard.generateMockWizard());
      }
      return wizards;
    }
  };

})();
