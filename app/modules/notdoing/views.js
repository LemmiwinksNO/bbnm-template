define([
    'app',

    // libs
    'jquery',
    'underscore',
    'backbone',
    'handlebars',

    // Tempalates
    'text!templates/notdoing/main.html',
    'text!templates/notdoing/item.html'

], function(app, $, _, Backbone, Handlebars, MainView, ItemView) {

    var Views = {};

    // Not Doing List Item View
    // --------------

    Views.Item = Backbone.View.extend({

        tagName: "li",

        template: Handlebars.compile(ItemView),

        events: {

        },

        initialize: function() {

        },

        render: function() {
            // this.$el.html(this.template(this.model.toJSON()));
            this.$el.html(this.template());
        }



    });

    // Not Doing List Main View
    // --------------

    Views.Main = Backbone.View.extend({

        el: $("#main"),

        template: Handlebars.compile(MainView),

        events: {
            'click #main-edit': 'clickEdit'
        },

        initialize: function() {
            this.$el.html(this.template);

            // Add listeners to the collection
            // this.listenTo(this.collection, 'add', this.addOne);
            // this.listenTo(this.collection, 'reset', this.addAll);
            // this.listenTo(this.collection, 'all', this.render);

            // this.collection.fetch();
        },

        render: function() {

        },

        clickEdit: function() {

        }

    });

    return Views;
});