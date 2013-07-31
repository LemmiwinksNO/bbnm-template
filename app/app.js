
define([
  'jquery',
  'underscore',
  'backbone',
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

    // This custom fetch method will load pre-compiled templates
    fetch: function(path) {

      // Concatenate the file extension.
      path = path + ".jade";

      // Return pre-compiled template. (We can't compile on the fly with Jade)
      return JST[path];
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
        el: "body"
      }, options));

      // Cache the refererence.
      this.layout = layout;

      // Return the reference, for chainability
      return layout;
    }
  }, Backbone.Events);

});
