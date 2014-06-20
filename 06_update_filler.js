// Main configuration fragment reference.
var root;

var configurable = studio.sdk.configurable;
var config = configurable.config;
var binding = configurable.binding;

var droidDiv = document.getElementById('droid');
var droidNameDiv = droidDiv.querySelector('div');
var wookieeDiv = document.getElementById('wookiee');
var wookieeNameDiv = wookieeDiv.querySelector('div');

// Declare configurable types/classes.
config.declare('CharacterType', {
  'name': '-- Choose --',
  'droid': '',
  'wookiee': ''
});

// Declare main configuration.
config.declare('StarWars', {
  'character': { '@type': 'CharacterType' }
});

// Instantiate.
var configuration = config.instantiate('StarWars', {});

// Register.
configurable.register(configuration, registerHandler);

function registerHandler(object) {
  console.log('registerHandler', object);
  root = object;

  setTimeout(function() {
    return;  // Remove to see some magic.
    configurable.hideFiller('character.droid');
    configurable.hideFiller('character.wookiee');
  }, 100);  // This is a Studio bug, we shouldn't need a timeout.

  binding.addPropertyChangeListener(root['character'], 'name', nameChangeHandler);
  binding.addPropertyChangeListener(root['character'], 'droid', droidHandler);
  binding.addPropertyChangeListener(root['character'], 'wookiee', wookieHandler);
}

function nameChangeHandler(name) {
  console.log('nameChangeHandler', root);
  return;  // Remove to see some magic.

  switch (name) {
    case 'Luke':
      configurable.changeFillerValue('character', {
        'droid': 'R2-D2'
      });
      configurable.showFiller('character.droid');
      configurable.hideFiller('character.wookiee');
      droidDiv.style.display = 'block';
      wookieeDiv.style.display = 'none';
      break;
    case 'Leia':
      configurable.changeFillerValue('character', {
        'droid': 'C-3PO'
      });
      configurable.showFiller('character.droid');
      configurable.hideFiller('character.wookiee');
      droidDiv.style.display = 'block';
      wookieeDiv.style.display = 'none';
      break;
    case 'Han':
      configurable.changeFillerValue('character', {
        'wookiee': 'Chewbacca'
      });
      configurable.hideFiller('character.droid');
      configurable.showFiller('character.wookiee');
      droidDiv.style.display = 'none';
      wookieeDiv.style.display = 'block';
      break;
    default:  // -- Choose --.
      configurable.hideFiller('character.droid');
      configurable.hideFiller('character.wookiee');
      configurable.showMessage('Please select a character.');
      droidDiv.style.display = 'none';
      wookieeDiv.style.display = 'none';
      break;
  }
}

function droidHandler(value) {
  droidNameDiv.textContent = value;
}

function wookieHandler(value) {
  wookieeNameDiv.textContent = value;
}
