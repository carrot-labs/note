/**
 * Database model
 */

var Notebook = require('./model');

/**
 * Creates a new notebook
 */

var create = function(req, res, cb) {
  var notebook = new Notebook(req.body);

  notebook.save(function(err, data) {
    cb(err, data, res);
  });
};

/**
 * Retrieves all notebooks
 */

var retrieve = function(req, res, cb) {
  Notebook.find({}, function(err, data) {
    cb(err, data, res);
  });
};

/**
 * Finds a notebook
 */

var findOne = function(req, res, cb) {
  var id = req.params.id;
  var query = {_id: id};

  Notebook.findOne(query, function(err, data) {
    cb(err, data, res);
  });
};


/**
 * Updates a notebook
 */

var update = function(req, res, cb) {
  var id = req.params.id;
  var query = {_id: id};
  var mod = req.body;

  delete mod._id;

  Notebook.update(query, mod, function(er, data) {
    cb(err, data, res);
  });
};

/**
 * Deletes a notebook
 */

var remove = function(req, res, cb) {
  var id = req.params.id;
  var query = {_id: id};

  Notebook.remove(query, function(err, data) {
    cb(err, data, res);
  });
};

/**
 * Exports the model
 */

module.exports = {
  create: create,
  retrieve: retrieve,
  findOne: findOne,
  update: update,
  remove: remove
};