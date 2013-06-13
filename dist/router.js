define([
  // Applicatoin.
  "app",

  // Modules.
  "modules/MyTodo"
],

function(app, MyTodo){
    window.AppRouter = Backbone.Router.extend({
        routes: {
            // Pages
            'mytodo': 'mytodo',

            // Default - catch all
            '*actions': 'defaultAction'
        },

        mytodo: function(){
            App = new MyTodo.AppView();

        },

        defaultAction: function(){
            console.log("defaultAction");
        }

    });

    return {};
});