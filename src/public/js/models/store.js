/* global DS, Todos */

Todos.Adapter = DS.RESTAdapter.extend({
    serializer: DS.RESTSerializer.extend({
        primaryKey: function (type) {
            "use strict";
            return '_id';
        }
    })
});

Todos.Store = DS.Store.extend({
    adapter: 'Todos.Adapter'
});
