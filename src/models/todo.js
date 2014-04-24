/* global module, require */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    TodoSchema;

TodoSchema = mongoose.Schema({
    title: String,
    is_completed: Boolean
});

module.exports = mongoose.model('Todo', TodoSchema);