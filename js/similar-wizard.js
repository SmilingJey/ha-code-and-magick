'use strict';

(function () {

  var userDialog = document.querySelector('.setup');
  var similarListElement = userDialog.querySelector('.setup-similar-list');

  var renderWizard = function (wizard, wizardTemplate) {
    var wizardElement = wizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };

  var renderSimilarWizards = function (wizards) {
    var similarWizardTemplate = document.querySelector('#similar-wizard-template')
                                .content.querySelector('.setup-similar-item');

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 4; i++) {
      fragment.appendChild(renderWizard(wizards[i], similarWizardTemplate));
    }
    similarListElement.appendChild(fragment);
  };

  similarListElement.classList.remove('hidden');

  var successHandler = function (wizards) {
    renderSimilarWizards(wizards.sort(function () {
      return Math.random() - 0.5;
    }).slice(0, 4));
    userDialog.querySelector('.setup-similar').classList.remove('hidden');
  };

  var similarWizardLoaded = false;

  window.similarWizard = {
    load: function () {
      if (!similarWizardLoaded) {
        window.backend.load(successHandler, window.backend.errorHandler);
        similarWizardLoaded = true;
      }
    }
  };
})();
