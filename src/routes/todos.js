/* global console, exports, require */

var TodoService = require('../services').todos,
    Todo = new TodoService(),
    logger = require('../logger').winston;

function findAll(req, res) {
    "use strict";
    Todo.findAll(function (err, todos) {
        if(err) {
            logger.error('An error occured while looking for todos: ' + err);
            return;
        }
        logger.silly('Found todos: ' + JSON.stringify(todos));
        return res.send({todos: todos});
    });
}

function create(req, res) {
    "use strict";
    var title = req.body.title,
        is_completed = req.body.is_completed;
    
    Todo.create(title, is_completed, function (err, todo) {
        if(err) {
            logger.error('An error occured while creating a todo: ' + err);
            return;
        }
        logger.silly('Todo created');
        return res.send({todo: todo});
    });
}

function update(req, res) {
    "use strict";
    var id = req.params.id,
        title = req.body.title,
        is_completed = req.body.is_completed;
    
    Todo.update(id, title, is_completed, function (err, todo) {
        if(err) {
            logger.error('An error occured while updating a todo: ' + err);
            return;
        }
        logger.silly('Todo updated');
        return res.send({todo: todo});
    });
}

function destroy(req, res) {
    "use strict";
    var id = req.params.id;
    
    Todo.destroy(id, function(err) {
        if(err) {
            logger.error('An error occured while destroying a todo: ' + err);
            return;
        }
        logger.silly('Todo destroyed');
    });
}


exports.find = findAll;
exports.create = create;
exports.update = update;
exports.destroy = destroy;