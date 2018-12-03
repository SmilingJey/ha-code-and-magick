'use strict';

(function () {

  var userDialog = document.querySelector('.setup');
  var similarListElement = userDialog.querySelector('.setup-similar-list');

  var renderWizard = function (wizard, wizardTemplate) {
    var wizardElement = wizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    return wizardElement;
  };

  var renderSimilarWizards = function (wizards) {

    var similarWizardTemplate = document.querySelector('#similar-wizard-template')
                                .content.querySelector('.setup-similar-item');

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < wizards.length; i++) {
      fragment.appendChild(renderWizard(wizards[i], similarWizardTemplate));
    }
    similarListElement.appendChild(fragment);
  };

  renderSimilarWizards(window.mockWizard.generateMockWizards(4));
  similarListElement.classList.remove('hidden');

})();
