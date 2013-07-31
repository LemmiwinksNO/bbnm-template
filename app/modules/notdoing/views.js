define([
    'app',

    // libs
    'jquery',
    'underscore',
    'backbone'

], function(app, $, _, Backbone) {

    var Views = {};

    // Not Doing List Item View
    // ------------------------

    Views.Item = Backbone.View.extend({

        tagName: "li",

        template: "notdoing/item",

        events: {
            'click .edit-item': 'clickEdit',
            'click .delete-item': 'clickDelete'
        },

        // serialize is what goes to your template
        serialize: function(){
            return {model: this.model};
        },

        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
            // this.render();
        },

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

        /**
         * Set and validate model before saving.
         */
        clickSave: function() {
            console.log("clickSave");
            var valid = this.model.set({
                title: $("#edit-modal input.title").val(),
                description: $("#edit-modal .description").val()
            }, {
                validate: true  // set now returns true or false
            });

            if (valid){
                this.model.save();
            }
        },

        clickDelete: function() {
            this.model.destroy();
            this.$el.remove();
        },

        remove: function() {
            this.$el.remove();
        }
    });

    // Not Doing List Main View
    // --------------

    Views.Main = Backbone.View.extend({

        template: "notdoing/main",

        events: {
            'click #main-edit': 'clickEdit',
            'click #add-item-modal': 'clickAddModal',
            'click #add-item': 'clickAddItem'
        },

        initialize: function() {
            // Add listeners to the collection
            this.listenTo(this.collection, 'add', this.addOne);
            this.listenTo(this.collection, 'invalid', this.invalid);

            // this.collection.on('all', function(event_name){
            //     console.log(event_name);
            // });

            this.collection.fetch();
        },

        // This is typically how you render a collection with
        // LayoutManager, but I chose to use addOne b/c it renders
        // the collection and handles user adding stories.
        // beforeRender: function(){
        //     this.collection.each(function(item){
        //         this.insertView(".column1 ul", new Views.Item({
        //             model: item
        //         }));
        //     }.bind(this));
        // },

        /**
         * Create a new notdo item view and insert it. Fires on add event.
         * @param  {model} notdo Notdo item
         */
        addOne: function(notdo) {
            if (notdo.isValid()) {
                var selector = "." + notdo.get("status") + " ul";
                this.insertView(selector, new Views.Item({
                    model: notdo
                })).render();
            }
        },

        invalid: function(model, errors) {
            this.$('.text-error').removeClass('hidden');

            // Load up error messages.
            _.each(errors, function(error){
                this.$('.text-error').text(error.message);
            });
        },

        /**
         * Load up modal for adding items and focus first input field.
         */
        clickAddModal: function() {
            this.$('.text-error').addClass('hidden');
            this.$el.find("#add-modal").modal();
            this.$("#add-modal").on('shown', function() {
                $(this).find("input.title").focus();
            });
        },

        /**
         * Add item to not doing list
         */
        clickAddItem: function() {
            this.$('.text-error').addClass('hidden');  // hide error messages
            var title = this.$("input.title").val();
            var description = this.$("textarea.description").val();

            this.collection.create({
                title: title,
                description: description,
                status: 'notdoing'
            }, {
                // wait: true,  // wait for response from server
                // // server callbacks
                // success: function(resp){
                //     console.log('success callback');
                // },
                // error: function(resp){
                //     console.log('error callback');
                // }
            });

            // Clear out input fields and focus title field.
            this.$("input.title").val('');
            this.$("textarea.description").val('');
            this.$("input.title").focus();
        }
    });

    return Views;
});