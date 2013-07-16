
// define(function(require, exports, module){

//     var Backbone = require("backbone");
//     var Todo = require("modules/todo");
//     var NotDoing = require("modules/notdoing");

define([
  // Application.
  "app",

  // Modules.
  "modules/todo",
  "modules/notdoing"
],

function(app, Todo, NotDoing){
    var Router = Backbone.Router.extend({
        initialize: function(){

            var collections = {
                notdos: new NotDoing.Collection()
            };

            // var notdos = new NotDoing.Collection();

            _.extend(this, collections);

            // app.useLayout("main-layout");
            // Set layout
            // app.useLayout("main-layout").setView(
            //     "#main", new NotDoing.Views.Main({
            //         collection: notdos
            //     })
            // ).render();

        },

        routes: {
            // Pages
            'mytodo': 'mytodo',
            'notdoing': 'notdoing',
            ''      : 'notdoing',
            'test'  : 'test',

            // Default - catch all
            '*actions': 'defaultAction'
        },

        test: function(){

        },

        mytodo: function(){
            var list = new Todo.Collection();
            App = new Todo.Views.List({
                collection: list
            });

        },

        notdoing: function(){
            var list = new NotDoing.Collection();

            app.useLayout("main-layout");
            app.layout.render();
            app.layout.insertView("#main", new NotDoing.Views.Main({
                collection: list
            })).render();

            // app.layout.render();

            // var myLayout = app.useLayout("main-layout");
            // myLayout.insertView("#main", new NotDoing.Views.Main({
            //     collection: list
            // })).render();

            // app.layout.insertView("body", new NotDoing.View.Main({
            //     collection: list
            // })).render();

            // App = new NotDoing.Views.Main({
            //     collection: list
            // });
        },

        defaultAction: function(){
            console.log("defaultAction");
        }

    });

    return Router;
});