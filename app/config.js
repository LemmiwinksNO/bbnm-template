
// Set the require.js configuration for your application.
require.config({

  // Initialize the application with the main application file and the JamJS
  // generated configuration file.
  // deps: ["../vendor/jam/require.config", "main"],

  paths: {
    'jquery': '../vendor/bower/jquery/jquery',
    'underscore': '../vendor/bower/lodash/dist/lodash.underscore',
    'backbone': '../vendor/bower/backbone/backbone',
    'layoutmanager': '../vendor/bower/layoutmanager/backbone.layoutmanager',
    'bootstrap': '../vendor/bootstrap/js/bootstrap',
    'templates': 'templates/templates',  // compiled jade templates
    'hotkeys': '../vendor/bower/jquery.hotkeys/jquery.hotkeys',
    'wysiwyg': '../vendor/bower/bootstrap-wysiwyg/bootstrap-wysiwyg'
  },

  shim: {
    'backbone': {
      'deps': ['underscore', 'jquery'],
      'exports': 'Backbone'
    },
    'layoutmanager': {
      'deps': ['jquery', 'backbone', 'underscore'],
      'exports': 'Backbone.Layout'
    },
    'underscore': {
      'exports': '_'
    },
    'bootstrap': ['jquery'],
    'wysiwyg': ['jquery', 'hotkeys', 'bootstrap']
  }

  // map: {
  //   // Opt for Lo-Dash Underscore compatibility build.
  //   "*": { "underscore": "../vendor/jam/lodash/dist/lodash.underscore" }
  // },

  // This should help with cache issues related to development.
  // urlArgs: "bust=" + Number(new Date())
});
