Todos.Adapter = DS.RESTAdapter.extend({
	serializer: DS.RESTSerializer.extend({
		primaryKey: function (type) {
			return '_id';
		}
	})
});

Todos.Store = DS.Store.extend({
  adapter: 'Todos.Adapter'
});