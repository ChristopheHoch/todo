/* global Ember, Todos */

Todos.Router.map(function() {
    "use strict";
    this.resource('todos', { path: '/' }, function () {
        this.route('active');
        this.route('completed');
    });
});

Todos.TodosRoute = Ember.Route.extend({
    model: function () {
        "use strict";
        return Todos.Todo.find();
    }
});

Todos.TodosIndexRoute = Ember.Route.extend({
    model: function () {
        "use strict";
        return Todos.Todo.find();
    }
});

Todos.TodosActiveRoute = Ember.Route.extend({
    model: function() {
        "use strict";
        return Todos.Todo.filter(function (todo) {
            if (!todo.get('isCompleted')) { return true; }
        });
    },
    renderTemplate: function(controller) {
        "use strict";
        this.render('todos/index', {controller: controller});
    }
});

Todos.TodosCompletedRoute = Ember.Route.extend({
    model: function() {
        "use strict";
        return Todos.Todo.filter(function (todo) {
            if (todo.get('isCompleted')) { return true; }
        });
    },
    renderTemplate: function(controller) {
        "use strict";
        this.render('todos/index', {controller: controller});
    }
});
