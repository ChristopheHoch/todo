/* global afterEach, beforeEach, describe, it, require, console */

var app = require('../../src/server'),
    TodoSchema = require('../../src/models').todo,
    _ = require('underscore'),
    should = require('chai').should(),
    mongoose = require('mongoose'),
    request = require('supertest');

describe('Todo Create API', function() {
    "use strict";
    var id;

    afterEach(function(done) {
        if(id) {
            TodoSchema.findByIdAndRemove(id, function(err) {
                if(err) {
                    console.log(err);
                    return;
                }
            });
        }
        done();
    });

    describe('when creating a new todo with no data', function() {
        it('should respond with 200', function(done){
            request(app)
            .post('/todos')
            .send({})
            .expect(400, done);
        });
    });

    describe('when creating a new todo with no todo object', function() {
        it('should respond with 200', function(done){
            var todo = {
                title: "Travailler",
                is_completed: false
            };

            request(app)
            .post('/todos')
            .send(todo)
            .expect(400, done);
        });
    });

    describe('when creating a new todo with no title', function() {
        it('should respond with 200', function(done){
            var todo = {
                is_completed: true
            };

            request(app)
            .post('/todos')
            .send({ todo: todo })
            .expect(400, done);
        });
    });

    describe('when creating a new todo with no completion status', function() {
        it('should respond with 200', function(done){
            var todo = {
                title: "Travailler"
            };

            request(app)
            .post('/todos')
            .send({ todo: todo })
            .expect(400, done);
        });
    });

    describe('when creating a new todo with correct data', function() {
        it('should respond with 200', function(done){
            var todo = {
                title: "Travailler",
                is_completed: false
            };

            request(app)
            .post('/todos')
            .send({ todo: todo })
            .expect(200)
            .end(function(err, data) {
                var newTodo;

                should.not.exist(err);
                should.exist(data);
                should.exist(data.body);
                should.exist(data.body.todo);
                newTodo = data.body.todo;

                should.exist(newTodo._id);
                id = newTodo._id;

                newTodo.title.should.equals("Travailler");
                done();
            });
        });
    });

});
