
/**
 * Module dependencies.
 */

var express = require('express')
  , mongoose = require('mongoose')
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
mongoose.connect('mongodb://test:test@paulo.mongohq.com:10019/todo');

db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function callback () {
  console.log("Connection openned...");
});

var todoSchema = mongoose.Schema({
	title: String,
	is_completed: Boolean
});
var Todo = mongoose.model('Todo', todoSchema);

app.get('/todos', function (req, res) {
   return Todo.find(function (err, todo) {
	 if (!err) {
	   console.log('Found todo: ' + JSON.stringify(todo));
	   return res.send({todos: todo});
	 } else {
	   return console.log('Error: Todo not found: ' + err);
	 }
   });
 });

app.post('/todos', function (req, res) {
	var todo = new Todo(req.body.todo);
	todo.save(function (err) {
		if (!err) {
		  return console.log("Todo created!");
		} else {
		  return console.log(err);
		}
	  });
	  return res.send({todo: todo});
 });

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
