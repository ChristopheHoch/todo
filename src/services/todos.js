/* global module, require */

var TodoModel = require('../models').todo,
    logger = require('../logger').winston;

function Todo() {}

Todo.prototype.findAll = function(callback) {
    "use strict";
    TodoModel.find(function(err, todos) {
        if(err) {
            logger.error('An error occured while find all todos:');
            logger.error(err);
            return callback({
                code: 500,
                message: 'Internal Server Error'
            }, null);
        }
        return callback(null, todos);
    });
};

Todo.prototype.create = function(data, callback) {
    "use strict";
    var newTodo = new TodoModel(data);

    newTodo.save(function (err, todo) {
        if(err) {
            logger.error('An error occured while creating a todo:');
            logger.error(err);
            return callback({
                code: 500,
                message: 'Internal Server Error'
            }, null);
        }
        return callback(null, todo);
    });
};

Todo.prototype.update = function(id, data, callback) {
    "use strict";
    TodoModel.findByIdAndUpdate(id, data, function(err, todo) {
        if(err) {
            logger.error('An error occured while updating the todo: ' + id);
            logger.error(err);
            return callback({
                code: 500,
                message: 'Internal Server Error'
            }, null);
        }
        return callback(null, todo);
    });
};

Todo.prototype.destroy = function(id, callback) {
    "use strict";
    TodoModel.findByIdAndRemove(id, function(err) {
        if(err) {
            logger.error('An error occured while deleting the todo: ' + id);
            logger.error(err);
            return callback({
                code: 500,
                message: 'Internal Server Error'
            });
        }
        return callback(null);
    });
};

module.exports = Todo;
