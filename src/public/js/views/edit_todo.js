/* global Ember, Todos */

Todos.EditTodoView = Ember.TextField.extend({
    classNames: ['edit'],

    insertNewline: function() {
        "use strict";
        this.get('controller').acceptChanges();
    },

    focusOut: function() {
        "use strict";
        this.get('controller').acceptChanges();
    },

    didInsertElement: function() {
        "use strict";
        this.$().focus();
    }
});

Ember.Handlebars.helper('edit-todo', Todos.EditTodoView);