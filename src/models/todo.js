/* global module, require */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    TodoSchema;

TodoSchema = mongoose.Schema({
    title: String,
    isCompleted: Boolean
});

module.exports = mongoose.model('Todo', TodoSchema);