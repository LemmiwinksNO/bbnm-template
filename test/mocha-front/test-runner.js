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

// add main? add app? router? modules? -> depends on data-main. 
// If set to main.js, the whole app is loaded(I think).
require(['require', 'chai', 'chai-jquery', 'mocha', 'jquery'],
  function(require, chai, chaiJquery){

  // Chai
  var should = chai.should();
  window.expect = chai.expect;
  chai.use(chaiJquery);  // plugin now ready to use

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
