
// This is the runtime configuration file.  It complements the Gruntfile.js by
// supplementing shared properties.
require.config({

  deps: ["main"],  // Initialize the application with the main application file.

  paths: {
    // Make vendor easier to access.
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
