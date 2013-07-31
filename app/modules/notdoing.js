
define([
  // Application
  "app",

  // libs
  'jquery',
  'underscore',
  'backbone',

  // Views
  'modules/notdoing/views'

], function(app, $, _, Backbone, Views){

    var NotDoing = app.module();

    // NotDoing model
    // ----------

    NotDoing.Model = Backbone.Model.extend({

        idAttribute: "_id",  // This lets us use PUT method

        defaults: {
            title: '',
            description: '',
            status: ''  // backlog, notdoing, doing, done, finished
        },

        // Validate on creation of new model instance.
        // initialize: function() {
        //   Backbone.Model.prototype.initialize.apply(this, arguments);
        //   var error = this.validate(this.attributes);
        //   if (error) {
        //     this.trigger('error', this, error);
        //   }
        // },

        validate: function(attrs) {
          var errors = [];
          if (_.isEmpty(attrs.title)){
            errors.push({name: 'title', message: 'Please fill title field.'});
          }
          return errors.length > 0 ? errors : false;
        },

        // Toggle the 'status' state of this item.
        toggle: function() {
            current = this.get("status");
            var status = 'notdoing';
            if (current === 'notdoing') {
                status = 'doing';
            } else if (current === 'doing') {
                status = 'done';
            }
            this.save({
              status: status
            });
        }

    });

    // NotDoing Collection
    // -------------------

    NotDoing.Collection = Backbone.Collection.extend({

        model: NotDoing.Model,

        // Save all of the notdoing items under the "notdoing" namespace.
        url: '/api/notdoing',

        // Filter down list of notdo items to backlog items
        backlog: function() {
          this.filter(function(notdo){
            return notdo.get('status') === 'backlog';
          });
        },

        // Filter down list of notdo items to notdone items
        notdoing: function() {
          this.filter(function(notdo){
            return notdo.get('status') === 'notdoing';
          });
        },

        // Filter down list of notdo items to doing items
        doing: function() {
          this.filter(function(notdo){
            return notdo.get('status') === 'doing';
          });
        },

        // Filter down list of notdo items to done items
        done: function() {
          this.filter(function(notdo){
            return notdo.get('status') === 'done';
          });
        },

        // Filter down list of notdo items to finished items.
        finished: function() {
          this.filter(function(notdo){
            return notdo.get('status') === 'finished';
          });
        }

    });

    // Notdoing Views - Main and Item
    // ------------------------------

    NotDoing.Views = Views;

    return NotDoing;

});