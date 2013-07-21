
define([
  // Application.
  "app",

  // Modules.
  // "modules/todo"
  "modules/notdoing"
],

function(app, NotDoing){
    var Router = Backbone.Router.extend({
        initialize: function(){
            // Set layout
            app.useLayout("main-layout").render();

        },

        routes: {
            // Pages
            'mytodo': 'mytodo',
            'notdoing': 'notdoing',
            ''      : 'notdoing',

            // Default - catch all
            '*actions': 'defaultAction'
        },

        mytodo: function(){
            var list = new Todo.Collection();
            App = new Todo.Views.List({
                collection: list
            });
        },

        notdoing: function(){
            var list = new NotDoing.Collection();

            app.layout.setView("#main", new NotDoing.Views.Main({
                collection: list
            })).render();
        },

        defaultAction: function(){
            console.log("defaultAction");
        }

    });

    return Router;
});