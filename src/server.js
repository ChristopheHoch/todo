/* global __dirname, module, require */

var express = require('express'),
    http = require('http'),
    path = require('path'),
    config = require('./configuration'),
    db = require('./database'),
    routes = require('./routes'),
    middleware = require('./middleware'),
    app = express();

app.set('port', config.get('express:port'));
app.configure('development', function() {
    "use strict";
    app.use(express.logger({ immediate: true, format: 'dev' }));
});
app.use(express.compress());
app.use(express.methodOverride());
app.use(express.json());
app.use(express.urlencoded());

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/todos', routes.todos.find);
app.post('/todos', routes.todos.create);
app.put('/todos/:id', routes.todos.update);
app.delete('/todos/:id', routes.todos.destroy);

app.use(middleware.notFound.index);

http.createServer(app).listen(app.get('port'));
module.exports = app;
