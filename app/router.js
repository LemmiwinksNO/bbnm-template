
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
            // Instantiate collections if needed

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

        index: function(){

        },

        notdoing: function(){
            var list = new NotDoing.Collection();

            app.layout.setView("#main", new NotDoing.Views.Main({
                collection: list
            })).render();
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