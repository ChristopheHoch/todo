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
        return this.store.find('todo');
    }
});

Todos.TodosIndexRoute = Ember.Route.extend({
    model: function () {
        "use strict";
        return this.store.find('todo');
    }
});

Todos.TodosActiveRoute = Ember.Route.extend({
    model: function() {
        "use strict";
        return this.store.filter('todo', function(todo) {
            return !todo.get('isCompleted');
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
        return this.store.filter('todo', function(todo) {
            return todo.get('isCompleted');
        });
    },
    renderTemplate: function(controller) {
        "use strict";
        this.render('todos/index', {controller: controller});
    }
});
