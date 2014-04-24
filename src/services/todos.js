/* global module, require */

var TodoModel = require('../models').todo,
    logger = require('../logger').winston;

function Todo() {}

Todo.prototype.findAll = function(callback) {
    "use strict";
    logger.silly('Finding all todos...');
    TodoModel.find(function(err, todos) {
        if(err) {
            return callback({
                code: 500,
                message: 'Internal Server Error'
            }, null);
        }
        return callback(null, todos);
    });
};

Todo.prototype.create = function(title, is_completed, callback) {
    var newTodo = new TodoModel({
        title: title,
        is_completed: is_completed
    });

    newTodo.save(function (err, todo) {
        if(err) {
            return callback({
                code: 500,
                message: 'Internal Server Error'
            }, null);
        }
        return callback(null, todo);
    });
};

Todo.prototype.update = function(id, title, is_completed, callback) {
    var updatedTodo = {
        title: title,
        is_completed: is_completed
    };

    TodoModel.findByIdAndUpdate(id, updatedTodo, function(err, todo) {
        if(err) {
            return callback({
                code: 500,
                message: 'Internal Server Error'
            }, null);
        }
        return callback(null, todo);
    });
};

Todo.prototype.destroy = function(id, callback) {
    TodoModel.findByIdAndRemove(id, function(err) {
        if(err) {
            return callback({
                code: 500,
                message: 'Internal Server Error'
            });
        }
        return callback(null);
    });
};

module.exports = Todo;
