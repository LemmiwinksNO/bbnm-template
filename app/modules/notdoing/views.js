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
            // this.render();
        },

        render: function() {
            // this.$el.html(this.template(this.model.toJSON()));
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }



    });

    // Not Doing List Main View
    // --------------

    Views.Main = Backbone.View.extend({

        el: $("#main"),

        template: Handlebars.compile(MainView),

        events: {
            'click #main-edit': 'clickEdit',
            'click #add-item-modal': 'clickAddModal',
            'click #add-item': 'clickAddItem'
        },

        initialize: function() {
            this.$el.html(this.template);

            // Add listeners to the collection
            this.listenTo(this.collection, 'add', this.addOne);
            // this.listenTo(this.collection, 'reset', this.addAll);
            // this.listenTo(this.collection, 'all', this.render);

            this.collection.fetch();

            this.render();
        },

        render: function() {
            // var options = {
            //     title: "Task"
            // };
            // var view = new Views.Item({model: options});
            // this.$(".column1 ul").append(view.render().el);
        },

        addOne: function(notdo) {
            console.log("addOne");
            var view = new Views.Item({model: notdo});
            var column = ".column" + notdo.get("status");
            this.$(column + " ul").append(view.render().el);
        },

        clickEdit: function() {

        },

        clickAddModal: function() {
            $("#myModal").modal();
        },

        clickAddItem: function() {
            console.log("clickAddItem");
            var title = $("input.title").val();
            var description = $("textarea.description").val();
            this.collection.create({
                title: title,
                description: description,
                status: 1
            });
        }

    });

    return Views;
});