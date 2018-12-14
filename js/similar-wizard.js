'use strict';

(function () {
  var userDialog = document.querySelector('.setup');
  var similarListElement = userDialog.querySelector('.setup-similar-list');
  var wizards;
  var referenceWizard;

  var renderWizard = function (wizard, wizardTemplate) {
    var wizardElement = wizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };

  var removeSimilarWizards = function () {
    while (similarListElement.hasChildNodes()) {
      similarListElement.removeChild(similarListElement.firstChild);
    }
  };

  var renderSimilarWizards = function (renderWizards) {
    removeSimilarWizards();
    var similarWizardTemplate = document.querySelector('#similar-wizard-template')
                                .content.querySelector('.setup-similar-item');

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 4; i++) {
      fragment.appendChild(renderWizard(renderWizards[i], similarWizardTemplate));
    }
    similarListElement.appendChild(fragment);
    similarListElement.classList.remove('hidden');
  };

  var getRank = function (wizard) {
    var rank = 0;
    if (wizard.colorCoat === referenceWizard.colorCoat) {
      rank += 2;
    }
    if (wizard.colorEyes === referenceWizard.colorEyes) {
      rank += 1;
    }
    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var successHandler = function (loadedWizards) {
    wizards = loadedWizards;
    window.similarWizard.showSimilarWizards();
  };

  var compareWizardRank = function (left, right) {
    var rankDiff = getRank(right) - getRank(left);
    if (rankDiff === 0) {
      rankDiff = namesComparator(left.name, right.name);
    }
    return rankDiff;
  };

  window.similarWizard = {
    showSimilarWizards: window.debounce(function () {
      referenceWizard = window.setup.getWizard();

      if (!wizards) {
        window.backend.load(successHandler, window.backend.errorHandler);
      } else {
        var similarWaizards = wizards.sort(compareWizardRank).slice(0, 4);
        renderSimilarWizards(similarWaizards);
        userDialog.querySelector('.setup-similar').classList.remove('hidden');
      }
    })
  };
})();
