/* global Ember, Todos */

Todos.TodosController = Ember.ArrayController.extend({
    actions: {
        createTodo: function () {
            "use strict";
            // Get the todo title set by the "New Todo" text field
            var title = this.get('newTitle');
            if (!title.trim()) { return; }

            // Create the new Todo model
            var todo = this.store.createRecord('todo', {
                title: title,
                isCompleted: false
            });

            // Clear the "New Todo" text field
            this.set('newTitle', '');

            // Save the new model
            todo.save();
        },
        
        clearCompleted: function () {
            "use strict";
            var completed = this.filterBy('isCompleted', true);
            completed.invoke('deleteRecord');

            this.get('store').commit();
        }
    },

    remaining: function () {
        "use strict";
        return this.filterBy('isCompleted', false).get('length');
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
        return this.filterBy('isCompleted', true).get('length');
    }.property('@each.isCompleted'),

    allAreDone: function (key, value) {
        "use strict";
        if (value === undefined) {
            return !!this.get('length') && this.everyProperty('isCompleted', true);
        } else {
            this.setEach('isCompleted', value);
            this.invoke('save');
            return value;
        }
    }.property('@each.isCompleted')
});
