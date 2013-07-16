// // Set the require.js configuration for your application.
// require.config({

    // deps: ["main"],  // Initialize the application with the main application file.

//     paths: {
//         'jquery': '../vendor/js/libs/jquery/jquery',
//         'bootstrap': '../vendor/bootstrap/js/bootstrap',
//         'underscore': '../vendor/js/libs/underscore-amd/underscore',
//         'backbone': '../vendor/js/libs/backbone-amd/backbone',
//         'handlebars' : '../vendor/js/libs/handlebars/handlebars',
//         'backbone.layoutmanager' : '../vendor/js/libs/layoutmanager/backbone.layoutmanager',
//         'text' : '../vendor/js/libs/requirejs-text/text'
//     },
//     shim: {
//         'bootstrap': ['jquery'],
//         // 'backbone': {
//         //     // These script dependencies should be loaded before
//         //     // loading backbone.js
//         //     deps: ['underscore', 'jquery'],
//         //     // Once loaded, use the global 'Backbone' as the
//         //     // module value.
//         //     exports: 'Backbone'
//         // },
//         'backbone.layoutmanager': {
//             'deps': [
//                 'jquery',
//                 'backbone',
//                 'underscore'
//             ],
//             'exports': 'Backbone.LayoutManager'
//         },
//         'handlebars': {
//             exports: 'Handlebars'
//         }
//     }
// });


// This is the runtime configuration file.  It complements the Gruntfile.js by
// supplementing shared properties.
require.config({

  deps: ["main"],  // Initialize the application with the main application file.

  paths: {
    // Make vendor easier to access.
    "vendor": "../vendor",
    'bootstrap': '../vendor/bower/bootstrap.css/js/bootstrap'
  },

  shim: {
    'bootstrap': ['jquery']
  },

  map: {
    // Opt for Lo-Dash Underscore compatibility build.
    "*": { "underscore": "vendor/jam/lodash/dist/lodash.underscore" }
  },

  // This should help with cache issues related to development.
  urlArgs: "bust=" + Number(new Date())
});
