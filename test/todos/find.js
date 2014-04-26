/* global afterEach, beforeEach, describe, it, require, console */

var app = require('../../src/server'),
    TodoSchema = require('../../src/models').todo,
    _ = require('underscore'),
    should = require('chai').should(),
    mongoose = require('mongoose'),
    request = require('supertest');

describe('Todo Find API', function() {
    "use strict";
    var todos = [],
        ids = [];

    beforeEach(function(done) {
        todos = [];
        ids = [];
        
        todos.push(new TodoSchema({
            title: "Read a book",
            is_completed: false
        }));
        todos.push(new TodoSchema({
            title: "Watch a movie",
            is_completed: true
        }));

        _.each(todos, function(todo) {
            todo.save(function(error, savedTodo) {
                ids.push(savedTodo._id);
            });
        });
        done();
    });

    afterEach(function(done) {
        _.each(ids, function(id) {
            TodoSchema.findByIdAndRemove(id, function(err) {
                if(err) {
                    console.log(err);
                }
            });
        });
        done();
    });

    /**
     * Test of the GET /todos route
     */
    describe('when requesting all todos', function() {
        it('should respond with 200', function(done){
            request(app)
            .get('/todos')
            .expect(200)
            .end(function(err, data) {
                should.not.exist(err);
                should.exist(data);
                should.exist(data.body);
                should.exist(data.body.todos);
                data.body.todos.length.should.equal(2);
                done();
            });
        });
    });

});
