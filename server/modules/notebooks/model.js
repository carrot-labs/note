/**
 * Module dependencies
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

/**
 * Creates the model schema
 */

var NotebookSchema = new Schema({

  name: {
    type: String,
    default: ''
  },

  created_at: {
    type: Date,
    default: Date.now
  },

  updated_at: {
    type: Date, 
    default: Date.now
  }

});


/**
 * Exports the model
 */

module.exports = mongoose.model('Notebook', NotebookSchema);