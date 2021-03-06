define([
    'app',

    // libs (needed?)
    'jquery',
    'underscore',
    'backbone',

    // Templates
    'text!templates/todo/main.html',
    'text!templates/todo/stats.html',
    'text!templates/todo/item.html'

], function(app, $, _, Backbone, MainView, StatsView, ItemView) {

    var Views = {};

    // Todo Item View
    // --------------

    Views.Item = Backbone.View.extend({

        tagName: "li",

        // template: Handlebars.compile(ItemView),
        template: _.template(ItemView),

        // The DOM events specific to an item.
        events: {
          "click .check"              : "toggleDone",
          "dblclick div.todo-text"    : "edit",
          "click span.todo-destroy"   : "clear",
          "keypress .todo-input"      : "updateOnEnter"
        },

        // The TodoView listens for changes to its model, re-rendering.
        initialize: function() {
          this.model.bind('change', this.render, this);
          this.model.bind('destroy', this.remove, this);
        },

        // Re-render the contents of the todo item.
        render: function() {
          $(this.el).html(this.template(this.model.toJSON()));
          this.setText();
          return this;
        },

        // To avoid XSS (not that it would be harmful in this particular app),
        // we use `jQuery.text` to set the contents of the todo item.
        setText: function() {
          var text = this.model.get('text');
          this.$('.todo-text').text(text);
          this.input = this.$('.todo-input');
          this.input.bind('blur', _.bind(this.close, this)).val(text);
        },

        // Toggle the `"done"` state of the model.
        toggleDone: function() {
          this.model.toggle();
        },

        // Switch this view into `"editing"` mode, displaying the input field.
        edit: function() {
          $(this.el).addClass("editing");
          this.input.focus();
        },

        // Close the `"editing"` mode, saving changes to the todo.
        close: function() {
          this.model.save({text: this.input.val()});
          $(this.el).removeClass("editing");
        },

        // If you hit `enter`, we're through editing the item.
        updateOnEnter: function(e) {
          if (e.keyCode == 13) this.close();
        },

        // Remove this view from the DOM.
        remove: function() {
          $(this.el).remove();
        },

        // Remove the item, destroy the model.
        clear: function() {
          this.model.destroy();
        }
    });

    // The List of Todos
    // -----------------

    Views.List = Backbone.View.extend({

        // Instead of generating a new element, bind to the existing skeleton of
        // the App already present in the HTML.
        el: $("#main"),

        // // Cache the template function for a single item.
        // template: _.template($('#todo-app').html()),
        template: _.template(MainView),
        // template: Handlebars.compile(MainView),

        // Our template for the line of statistics at the bottom of the app.
        // statsTemplate: _.template($('#stats-template').html()),
        statsTemplate: _.template(StatsView),
        // statsTemplate: Handlebars.compile(StatsView),

        // Delegated events for creating new items, and clearing completed ones.
        events: {
          "keypress #new-todo":  "createOnEnter",
          "keyup #new-todo":     "showTooltip",
          "click .todo-clear a": "clearCompleted"
        },

        // At initialization we bind to the relevant events on the `Todos`
        // collection, when items are added or changed. Kick things off by
        // loading any preexisting todos that might be saved in *localStorage*.
        initialize: function() {
            this.$el.html(this.template);

            this.input = this.$("#new-todo");

            this.collection.bind('add',   this.addOne, this);
            this.collection.bind('reset', this.addAll, this);
            this.collection.bind('all',   this.render, this);

            this.collection.fetch();
        },

        // Re-rendering the App just means refreshing the statistics -- the rest
        // of the app doesn't change.
        render: function() {
          this.$('#todo-stats').html(this.statsTemplate({
            total:      this.collection.length,
            done:       this.collection.done().length,
            remaining:  this.collection.remaining().length
          }));
        },

        // Add a single todo item to the list by creating a view for it, and
        // appending its element to the `<ul>`.
        addOne: function(todo) {
          var view = new Views.Item({model: todo});
          this.$("#todo-list").append(view.render().el);
        },

        // Add all items in the **Todos** collection at once.
        addAll: function() {
          this.collection.each(this.addOne);
        },

        // If you hit return in the main input field, and there is text to save,
        // create new **Todo** model persisting it to *localStorage*.
        createOnEnter: function(e) {
          var text = this.input.val();
          if (!text || e.keyCode != 13) return;
          this.collection.create({text: text});
          this.input.val('');
        },

        // Clear all done todo items, destroying their models.
        clearCompleted: function() {
          _.each(this.collection.done(), function(todo){ todo.destroy(); });
          return false;
        },

        // Lazily show the tooltip that tells you to press `enter` to save
        // a new todo item, after one second.
        showTooltip: function(e) {
          var tooltip = this.$(".ui-tooltip-top");
          var val = this.input.val();
          tooltip.fadeOut();
          if (this.tooltipTimeout) clearTimeout(this.tooltipTimeout);
          if (val === '' || val == this.input.attr('placeholder')) return;
          var show = function(){ tooltip.show().fadeIn(); };
          this.tooltipTimeout = _.delay(show, 1000);
        }
    });

    return Views;

});