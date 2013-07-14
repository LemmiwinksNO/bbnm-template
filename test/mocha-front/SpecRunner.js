require.config({
  // baseUrl: '/backbone-tests/',
  paths: {
    'jquery': '../../vendor/js/libs/jquery/jquery',
    'bootstrap': '../../vendor/bootstrap/js/bootstrap',
    'underscore': '../../vendor/js/libs/underscore-amd/underscore',
    'backbone': '../../vendor/js/libs/backbone-amd/backbone',
    'handlebars' : '../../vendor/js/libs/handlebars/handlebars',
    'backbone.layoutmanager' : '../../vendor/js/libs/layoutmanager/backbone.layoutmanager',
    'text' : '../../vendor/js/libs/requirejs-text/text',
    'mocha'         : '../../vendor/js/libs/mocha/mocha',
    'chai'          : '../../vendor/js/libs/chai/chai',
    'chai-jquery'   : '../../vendor/js/libs/chai-jquery/chai-jquery',
    'models'        : 'models',
    'notdoing'      : '../../app/modules/notdoing'
  },
  shim: {
    'bootstrap': ['jquery'],
    'backbone.layoutmanager': {
      'deps': [
        'jquery',
        'backbone',
        'underscore'
      ],
      'exports': 'Backbone.LayoutManager'
    },
    'handlebars': {
      exports: 'Handlebars'
    },
    'chai-jquery': ['jquery', 'chai']
  },
  urlArgs: 'bust=' + (new Date()).getTime()
});

require(['require', 'chai', 'chai-jquery', 'mocha', 'jquery'], function(require, chai, chaiJquery){

  // Chai
  var should = chai.should();
  chai.use(chaiJquery);

  /*globals mocha */
  mocha.setup('bdd');

  require([
    'specs/model-test.js',
    'specs/notdoing-test.js'
  ], function(require) {
    mocha.run();
  });

});