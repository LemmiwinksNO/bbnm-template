define([
    'app',

    // libs
    'jquery',
    'underscore',
    'backbone',

    // Tempalates
    'text!templates/notdoing/main.html',
    'text!templates/notdoing/item.html'

], function(app, $, _, Backbone, MainView, ItemView) {

    var Views = {};

    // Not Doing List Item View
    // ------------------------

    Views.Item = Backbone.View.extend({

        tagName: "li",

        // template: Handlebars.compile(ItemView),
        // template: _.template(ItemView),
        template: "notdoing/item",

        events: {
            'click .edit-item': 'clickEdit',
            'click .delete-item': 'clickDelete'
        },

        // serialize is what goes to your template
        serialize: function(){
            return {model: this.model };
        },

        initialize: function() {
            console.log("Views.item ", this.model);
            this.listenTo(this.model, 'change', this.render);
            // this.listenTo(this.model, 'destroy', this.remove);
            // this.render();
        },

        // render: function() {
        //     // this.$el.html(this.template(this.model.toJSON()));
        //     return this;
        // },

        /**
         * Edit an existing item.
         * Load up edit modal.
         */
        clickEdit: function() {
            // Create modal and set input fields
            $("#edit-modal input.title").val(this.model.get("title"));
            $("#edit-modal .description").val(this.model.get("description"));
            $("#edit-modal").modal();

            // Focus first input field
            $("#edit-modal").on('shown', function() {
                $(this).find("input.title").focus();
            });

            // Make save button work
            $("#edit-modal #save-item").click(function(){
                this.clickSave();
            }.bind(this));
        },

        clickSave: function() {
            this.model.save({
                title: $("#edit-modal input.title").val(),
                description: $("#edit-modal .description").val()
            });
            $("#edit-modal").modal('hide');
        },

        clickDelete: function() {
            this.model.destroy();
            this.$el.remove();
        }


    });

    // Not Doing List Main View
    // --------------

    Views.Main = Backbone.View.extend({

        // template: Handlebars.compile(MainView),
        // template: _.template(MainView),
        template: "notdoing/main",

        events: {
            'click #main-edit': 'clickEdit',
            'click #add-item-modal': 'clickAddModal',
            'click #add-item': 'clickAddItem'
        },

        initialize: function() {
            // this.$el.html(this.template);

            // Add listeners to the collection
            this.listenTo(this.collection, 'add', this.addOne);
            // this.listenTo(this.collection, 'reset', this.addAll);
            // this.listenTo(this.collection, 'all', this.render);

            this.collection.fetch();

            this.listenTo(this.collection, 'reset', this.render);
        },

        beforeRender: function(){
            console.log("beforeRender");
            this.collection.each(function(item){
                this.insertView(".column1 ul", new Views.Item({
                    model: item
                }));
            }.bind(this));
        },

        // render: function() {
        //     // var options = {
        //     //     title: "Task"
        //     // };
        //     // var view = new Views.Item({model: options});
        //     // this.$(".column1 ul").append(view.render().el);
        // },

        addOne: function(notdo) {
            console.log("addOne ", notdo);
            var view = new Views.Item({model: notdo});
            var column = ".column" + notdo.get("status");
            this.$(column + " ul").append(view.render().el);
            this.insertView(".column1 ul", new Views.Item({
                model: notdo
            })).render();
        },

        /**
         * Load up modal for adding items and focus first input field.
         */
        clickAddModal: function() {
            this.$el.find("#add-modal").modal();
            this.$("#add-modal").on('shown', function() {
                $(this).find("input.title").focus();
            });
        },

        /**
         * Add item to not doing list
         */
        clickAddItem: function() {
            console.log("clickAddItem");
            var title = $("input.title").val();
            var description = $("textarea.description").val();
            var item;
            if (title){
                item = this.collection.create({
                    title: title,
                    description: description,
                    status: 1
                });
            }

            // this.addOne(item);
        }
    });

    return Views;
});