/* global Ember, Todos */

Todos.TodosController = Ember.ArrayController.extend({
    createTodo: function () {
        "use strict";
        // Get the todo title set by the "New Todo" text field
        var title = this.get('newTitle');
        if (!title.trim()) { return; }

        // Create the new Todo model
        var todo = Todos.Todo.createRecord({
            title: title,
            isCompleted: false
        });

        // Clear the "New Todo" text field
        this.set('newTitle', '');

        // Save the new model
        todo.save();
    },

    remaining: function () {
        "use strict";
        return this.filterProperty('isCompleted', false).get('length');
    }.property('@each.isCompleted'),

    inflection: function () {
        "use strict";
        var remaining = this.get('remaining');
        return remaining === 1 ? 'item' : 'items';
    }.property('remaining'),

    hasCompleted: function () {
        "use strict";
        return this.get('completed') > 0;
    }.property('completed'),

    completed: function () {
        "use strict";
        return this.filterProperty('isCompleted', true).get('length');
    }.property('@each.isCompleted'),

    clearCompleted: function () {
        "use strict";
        var completed = this.filterProperty('isCompleted', true);
        completed.invoke('deleteRecord');

        this.get('store').commit();
    },

    allAreDone: function (key, value) {
        "use strict";
        if (value === undefined) {
            return !!this.get('length') && this.everyProperty('isCompleted', true);
        } else {
            this.setEach('isCompleted', value);
            this.get('store').save();
            return value;
        }
    }.property('@each.isCompleted')
});
