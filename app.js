
/**
 * Module dependencies.
 */

var express = require('express')
  , mongoose = require('mongoose')
  , config = require('./config')
  , http = require('http')
  , path = require('path')
  , app
  , db;

app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// connection to MongoDB
mongoose.connect(config.creds.mongoose_auth);

db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function callback() {
	console.log("Connection openned...");

	var todoSchema = mongoose.Schema({
		title: String,
		is_completed: Boolean
	});
	var Todo = mongoose.model('Todo', todoSchema);
	
	app.get('/todos', function (req, res) {
		Todo.find(function (err, todos) {
			if (!err) {
				console.log('Found todos: ' + JSON.stringify(todos));
				return res.send({todos: todos});
			} else {
				return console.log('Error: Todos not found: ' + err);
			}
		});
	});
	
	app.post('/todos', function (req, res) {
		var todo = new Todo(req.body.todo);
		todo.save(function (err) {
			if (!err) {
				return console.log("Todo created!");
			} else {
				console.log('Error: Todo not created: ' + err);
				return console.log(err);
			}
		});
		return res.send({todo: todo});
	});
	
	app.put('/todos/:id', function (req, res) {
		return Todo.findById(req.params.id, function (err, todo) {
			todo.title = req.body.todo.title;
			todo.is_completed = req.body.todo.is_completed;
			return todo.save(function (err) {
				if (!err) {
					console.log("Todo updated!");
				} else {
					console.log('Error: Todo not updated: ' + err);
					console.log(err);
				}
				return res.send({todo: todo});
			});
		});
	});
	
	app.delete('/todos/:id', function (req, res) {
		return Todo.findById(req.params.id, function (err, todo) {
			return todo.remove(function (err) {
				if (!err) {
					console.log("Todo deleted!");
					return res.send('');
				} else {
					console.log('Error: Todo not deleted: ' + err);
					console.log(err);
				}
			});
		});
	});
	
});

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
