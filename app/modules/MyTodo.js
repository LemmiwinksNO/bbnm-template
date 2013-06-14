define([
  // Application
  "app",

  // libs? Like jQuery, backbone, underscore. Why don't we have to add those here?

  // Templates
  // 'text!templates/mytodo/main.html',
  // 'text!templates/mytodo/stats.html',
  // 'text!templates/mytodo/item.html'

  // Views
  'modules/MyTodo/views'

], function(app, Views){

  var Mytodo = app.module();


  // Todo Model
  // ----------

  // Our basic **Todo** model has `text`, `order`, and `done` attributes.
  Mytodo.Model = Backbone.Model.extend({
      idAttribute: "_id",

    // Default attributes for a todo item.
    defaults: function() {
      return {
        done:  false
      };
    },

    // Toggle the `done` state of this todo item.
    toggle: function() {
      this.save({
        done: !this.get("done")
      });
    }

  });

  // Todo Collection
  // ---------------

  // The collection of todos used to be backed by *localStorage* instead of a remote
  // server, but now uses our /api/todos backend for persistance.
  Mytodo.Collection = Backbone.Collection.extend({

    // Reference to this collection's model.
    model: Mytodo.Model,

    // Save all of the todo items under the `"todos"` namespace.
    url: '/api/todos',

    // Filter down the list of all todo items that are finished.
    done: function() {
      return this.filter(function(todo){ return todo.get('done'); });
    },

    // Filter down the list to only todo items that are still not finished.
    remaining: function() {
      return this.without.apply(this, this.done());
    },

    // We keep the Todos in sequential order, despite being saved by unordered
    // GUID in the database. This generates the next order number for new items.
    nextOrder: function() {
      if (!this.length) return 1;
      return this.last().get('order') + 1;
    },

    // Todos are sorted by their original insertion order.
    comparator: function(todo) {
      return todo.get('order');
    }

  });

  // Create our global collection of **Todos**.
  // Mytodo.Todos = new Mytodo.Collection();


  // Todo Item View and Todo List View
  // ---------------------------------

  Mytodo.Views = Views;

  return Mytodo;

});