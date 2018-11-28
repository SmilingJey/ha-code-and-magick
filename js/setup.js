'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_COUNT = 4;

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var userNameInput = setup.querySelector('.setup-user-name');
var setupWizardCoatColor = document.querySelector('.setup-wizard .wizard-coat');
var setupWizardCoatColorInput = document.querySelector('input[name=coat-color]');
var setupWizardEyeColor = document.querySelector('.setup-wizard .wizard-eyes');
var setupWizardEyeColorInput = document.querySelector('input[name=eyes-color]');
var setupWizardFireballColor = document.querySelector('.setup-fireball-wrap');
var setupWizardFireballColorInput = document.querySelector('input[name=fireball-color]');

var getNextArrayItem = function (arr, item) {
  var currentIndex = arr.indexOf(item);
  var nextIndex = currentIndex < arr.length - 1 ? currentIndex + 1 : 0;
  return arr[nextIndex];
};

var getRandomItem = function (items) {
  return items[Math.floor(Math.random() * items.length)];
};

var generateMockWizard = function () {
  var mockWizard = {
    name: getRandomItem(NAMES) + ' ' + getRandomItem(SURNAMES),
    coatColor: getRandomItem(COAT_COLORS),
    eyesColor: getRandomItem(EYES_COLORS)
  };
  return mockWizard;
};

var generateMockWizards = function (count) {
  var wizards = [];
  for (var i = 0; i < count; i++) {
    wizards.push(generateMockWizard());
  }
  return wizards;
};

var renderWizard = function (wizard, wizardTemplate) {
  var wizardElement = wizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var renderSimilarWizards = function (wizards) {
  var userDialog = document.querySelector('.setup');
  var similarListElement = userDialog.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
                              .content.querySelector('.setup-similar-item');

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i], similarWizardTemplate));
  }
  similarListElement.appendChild(fragment);
};

var wizards = generateMockWizards(WIZARD_COUNT);
renderSimilarWizards(wizards);

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  if (document.activeElement !== userNameInput) {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  }
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

userNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else {
    target.setCustomValidity('');
  }
});

setupWizardCoatColor.addEventListener('click', function () {
  var newColor = COAT_COLORS[Math.floor(Math.random() * COAT_COLORS.length)];
  setupWizardCoatColor.style.fill = newColor;
  setupWizardCoatColorInput.value = newColor;
});

setupWizardEyeColor.addEventListener('click', function () {
  var newColor = getNextArrayItem(EYES_COLORS, setupWizardEyeColor.style.fill);
  setupWizardEyeColor.style.fill = newColor;
  setupWizardEyeColorInput.value = newColor;
});

setupWizardFireballColor.addEventListener('click', function () {
  var newColor = FIREBALL_COLORS[Math.floor(Math.random() * FIREBALL_COLORS.length)];
  setupWizardFireballColor.style.background = newColor;
  setupWizardFireballColorInput.value = newColor;
});

