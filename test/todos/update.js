/* global afterEach, beforeEach, describe, it, require, console */

var app = require('../../src/server'),
    TodoSchema = require('../../src/models').todo,
    _ = require('underscore'),
    should = require('chai').should(),
    mongoose = require('mongoose'),
    request = require('supertest');

describe('Todo Update API', function() {
    "use strict";
    var id;

    beforeEach(function(done) {
        var todo = new TodoSchema({
            title: "Read a book",
            is_completed: false
        });

        todo.save(function(error, savedTodo) {
            id = savedTodo._id;
            done();
        });
    });

    afterEach(function(done) {
        TodoSchema.findByIdAndRemove(id, function(err) {
            if(err) {
                console.log(err);
            }
            done();
        });
    });

    describe('when updating a todo with unknown id', function() {
        it('should respond with 500', function(done){
            var update = {
                    title: "Eat a sandwich",
                    is_completed: false
                };
            
            request(app)
            .put('/todos/123465')
            .send({ todo: update })
            .expect(500, done);
        });
    });
    
    describe('when updating a todo with correct data', function() {
        it('should respond with 200', function(done){
            var update = {
                    title: "Eat a sandwich",
                    is_completed: false
                };
            
            request(app)
            .put('/todos/' + id)
            .send({ todo: update })
            .expect(200)
            .end(function(err, data) {
                var updatedTodo;
                
                should.not.exist(err);
                should.exist(data);
                should.exist(data.body);
                should.exist(data.body.todo);
                updatedTodo = data.body.todo;
                
                updatedTodo._id.should.equals(id.toString(16));
                updatedTodo.title.should.equals("Eat a sandwich");
                done();
            });
        });
    });
    
});
