define([
  // Applicatoin.
  "app",

  // Modules.
  "modules/todo"
],

function(app, Todo){
    var Router = Backbone.Router.extend({
        routes: {
            // Pages
            'mytodo': 'mytodo',
            ''      : 'mytodo',

            // Default - catch all
            '*actions': 'defaultAction'
        },

        mytodo: function(){
            var list = new Todo.Collection();
            App = new Todo.Views.List({
                collection: list
            });

        },

        defaultAction: function(){
            console.log("defaultAction");
        }

    });

    return Router;
});