define([
  // Applicatoin.
  "app",

  // Modules.
  "modules/MyTodo"
],

function(app, MyTodo){
    var Router = Backbone.Router.extend({
        routes: {
            // Pages
            'mytodo': 'mytodo',
            '': 'mytodo',

            // Default - catch all
            '*actions': 'defaultAction'
        },

        mytodo: function(){

            var list = new MyTodo.Collection();

            App = new MyTodo.Views.List({
                collection: list
            });

        },

        defaultAction: function(){
            console.log("defaultAction");
        }

    });

    return Router;
});