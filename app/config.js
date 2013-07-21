
// Set the require.js configuration for your application.
require.config({

  // Initialize the application with the main application file and the JamJS
  // generated configuration file.
  // deps: ["../vendor/jam/require.config", "main"],

  paths: {
    "vendor": "../vendor",
    'bootstrap': '../vendor/bower/bootstrap.css/js/bootstrap',
    'templates': 'templates/templates'  // compiled jade templates
  },

  shim: {
    'bootstrap': ['jquery']
  },

  map: {
    // Opt for Lo-Dash Underscore compatibility build.
    "*": { "underscore": "../vendor/jam/lodash/dist/lodash.underscore" }
  },

  // This should help with cache issues related to development.
  urlArgs: "bust=" + Number(new Date())
});
