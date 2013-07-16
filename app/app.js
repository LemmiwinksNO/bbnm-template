
// define(function(require, exports, module) {

//   // External dependencies
//   var $ = require("jquery");
//   var _ = require("underscore");
//   var Backbone = require("backbone");
//   // var LayoutManager = require("backbone.layoutmanager");
//   var Bootstrap = require("bootstrap");

define([

  // Do we need to add libraries? Well backbone.layoutmanager depends on
  // backbone, which depends on underscore and jquery.
  'jquery',
  'underscore',
  'backbone',
  // 'jade',

  "backbone.layoutmanager",
  "bootstrap",
  "templates"
],

function($, _, Backbone, Layout) {

  // Provide a global location to place configuration settings and module
  // creation.
  var app = {
    // The root path to run the application through.
    root: "/"
  };


  // Localize or create a new JavaScript Template object.
  var JST = window.JST = window.JST || {};

  // Configure LayoutManager with Backbone Boilerplate defaults.
  Backbone.Layout.configure({
    // Allow LayoutManager to augment Backbone.View.prototype.
    manage: true,

    // Indicate where templates are stored
    prefix: "app/templates/",

    // This custom fetch method will load pre-compiled templates or
    // fetch them remotely with AJAX.
    fetch: function(path) {

      // Concatenate the file extension.
      path = path + ".jade";

      // console.log(JST[path]);

      return JST[path];

      // If the template has not been loaded yet, then load.
      // if (!JST[path]) {
      //   done = this.async();
      //   return $.ajax({ url: app.root + path }).then(function(contents) {
      //     console.log(contents);
      //     JST[path] = Jade.compile(contents);
      //     JST[path].__compiled__ = true;

      //     done(JST[path]);
      //   });
      // }

      // return JST[path];

      // If the template hasn't been compiled yet, then compile.
      // if (!JST[path].__compiled__) {
      //   JST[path] = Jade.template(JST[path]);
      //   JST[path].__compiled__ = true;
      // }

      // return JST[path];
    }
  });

  // Mix Backbone.Events, modules, and layout management into the app object.
  return _.extend(app, {
    // Create a custom object with a nested Views object.
    module: function(additionalProps) {
      return _.extend({ Views: {} }, additionalProps);
    },

    // Helper for using layouts.
    useLayout: function(name, options) {
      // Enable variable arity by allowing the first argument to be the options
      // object and omitting the name argument.
      if (_.isObject(name)) {
        options = name;
      }

      // Ensure options is an object.
      options = options || {};

      // If a name property was specified use that as the template.
      if (_.isString(name)) {
        options.template = name;
      }

      // Create a new Layout with options.
      var layout = new Backbone.Layout(_.extend({
        el: "#crucial"
      }, options));

      // Cache the refererence.
      this.layout = layout;

      // Return the reference, for chainability
      return layout;
    }
  }, Backbone.Events);

});
