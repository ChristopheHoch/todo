/* global Ember, Todos */

Todos.TodoController = Ember.ObjectController.extend({
    actions: {
        
        editTodo: function () {
            "use strict";
            this.set('isEditing', true);
        },
        
        removeTodo: function () {
            "use strict";
            var todo = this.get('model');
            todo.deleteRecord();
            todo.save();
        }
        
    },
    
    isCompleted: function(key, value) {
        "use strict";
        var model = this.get('model');

        if (value === undefined) {
            // property being used as a getter
            return model.get('isCompleted');
        } else {
            // property being used as a setter
            model.set('isCompleted', value);
            model.save();
            return value;
        }
    }.property('model.isCompleted'),

    isEditing: false,

    acceptChanges: function () {
        "use strict";
        this.set('isEditing', false);
        this.get('model').save();
    }
});
