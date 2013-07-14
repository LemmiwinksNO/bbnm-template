define([
  // Application
  "app",

  // libs
  'jquery',
  'underscore',
  'backbone',

  // Views
  // 'modules/notdoing/views'

], function(app, $, _, Backbone, Views){

    var NotDoing = app.module();

    // NotDoing model
    // ----------

    NotDoing.Model = Backbone.Model.extend({

        idAttribute: "_id",  // This lets us use PUT method

        defaults: {
            title: '',
            description: '',
            status: 1
        },

        // Toggle the 'status' state of this item.
        toggle: function() {
            current = this.get("status");
            var status = 0;
            console.log("current status = ", current);  // is this a number or string?
            if (current === 0) {
                status = 1;
            } else if (current === 1) {
                status = 2;
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
        url: '/api/notdoing'

    });

    // Notdoing Views - Main and Item
    // ------------------------------

    NotDoing.Views = Views;

    return NotDoing;

});