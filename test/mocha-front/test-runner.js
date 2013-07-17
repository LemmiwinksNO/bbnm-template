require.config({
  // baseUrl: '/backbone-tests/',
  paths: {
    'jquery': '../vendor/jam/jquery/dist/jquery',
    'mocha'         : '../node_modules/mocha/mocha',
    'chai'          : '../node_modules/chai/chai',
    'chai-jquery'   : '../../node_modules/chai-jquery/chai-jquery'
    // 'models'        : 'models',
    // 'notdoing'      : '../../app/modules/notdoing'
  },
  shim: {
    'chai-jquery': ['jquery', 'chai']
  },
  urlArgs: 'bust=' + (new Date()).getTime()
});

require(['require', 'chai', 'chai-jquery', 'mocha', 'jquery'],
  function(require, chai, chaiJquery){

  // Chai
  var should = chai.should();
  window.expect = chai.expect;
  chai.use(chaiJquery);

  /*globals mocha */
  mocha.setup('bdd');

  require([
    '../test/mocha-front/tests/example',
    '../test/mocha-front/tests/boilerplate/router'
  ], function(require) {
    if (window.mochaPhantomJS){
      mochaPhantomJS.run();
    } else {
      mocha.run();
    }
  });

});


// var tests = [

//   // Load the example tests, replace this and add your own tests.
//   "tests/example",

//   // Ensure the boilerplate functions correctly.
//   "tests/boilerplate/router"

// ];

// // Prefer the BDD testing style.
// mocha.setup("bdd");

// // Make async.
// if (window.__karma__) {
//   window.__karma__.loaded = function() {};
// }

// // Set up the assertion library.
// // Compatible libraries: http://visionmedia.github.io/mocha/#assertions
// window.expect = chai.expect;

// require({
//   // Set the application endpoint.
//   paths: { tests: "../test/mocha/tests" },

//   // Determine the baseUrl if we are in Karma or not.
//   baseUrl: window.__karma__ ? "base/app" : "../../app"
// },

// // Load the configuration.
// ["config"],

// function() {
//   // Load all tests.
//   require(tests, function() {

//     // This will start Karma if it exists.
//     if (window.__karma__) {
//       window.__karma__.start();
//     } else {
//       // Only once the dependencies have finished loading, call mocha.run.
//       mocha.run();
//     }

//   });
// });
