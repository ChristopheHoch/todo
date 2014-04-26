/* global afterEach, beforeEach, describe, it, require, console */

var app = require('../../src/server'),
    TodoSchema = require('../../src/models').todo,
    _ = require('underscore'),
    should = require('chai').should(),
    mongoose = require('mongoose'),
    request = require('supertest');

describe('Todo Destroy API', function() {
    "use strict";
    var id;

    beforeEach(function(done) {
        var todo = new TodoSchema({
            title: "Read a book",
            is_completed: false
        });

        todo.save(function(error, savedTodo) {
            id = savedTodo._id;
        });
        done();
    });

    afterEach(function(done) {
        TodoSchema.findByIdAndRemove(id, function(err) {
            if(err) {
                console.log(err);
            }
        });
        done();
    });
    
    describe('when deleting a todo with unknown id', function() {
        it('should respond with 400', function(done){
            request(app)
            .delete('/todos/123456')
            .expect(500, done);
        });
    });

    describe('when deleting a todo with correct data', function() {
        it('should respond with 200', function(done){
            request(app)
            .delete('/todos/' + id)
            .expect(200, done);
        });
    });

});
