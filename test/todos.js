/* global afterEach, beforeEach, describe, it, require, console */

var app = require('../src/server'),
    TodoSchema = require('../src/models').todo,
    _ = require('underscore'),
    should = require('chai').should(),
    mongoose = require('mongoose'),
    request = require('supertest');

describe('Todo API', function() {
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
    
    /**
     * Test of the POST /todos route
     */
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
                ids.push(newTodo._id);

                newTodo.title.should.equals("Travailler");
                done();
            });
        });
    });
    
    /**
     * Test of the PUT /todos route
     */
    describe('when updating a todo with correct data', function() {
        it('should respond with 200', function(done){
            var todo = todos[1],
                update = {
                    title: "Eat a sandwich",
                    is_completed: todo.is_completed
                };
            
            request(app)
            .put('/todos/' + todo._id)
            .send({ todo: update })
            .expect(200)
            .end(function(err, data) {
                var updatedTodo;
                
                should.not.exist(err);
                should.exist(data);
                should.exist(data.body);
                should.exist(data.body.todo);
                updatedTodo = data.body.todo;
                
                updatedTodo._id.should.equals(todo._id.toString(16));
                updatedTodo.title.should.equals("Eat a sandwich");
                done();
            });
        });
    });
    
});
