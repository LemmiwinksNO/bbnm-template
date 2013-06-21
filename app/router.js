define([
  // Application.
  "app",

  // Modules.
  "modules/todo",
  "modules/notdoing"
],

function(app, Todo, NotDoing){
    var Router = Backbone.Router.extend({
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
            App = new NotDoing.Views.Main({
                collection: list
            });
        },

        defaultAction: function(){
            console.log("defaultAction");
        }

    });

    return Router;
});