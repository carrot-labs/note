/**
 * Module dependencies
 */
 
var express = require('express');
var router   =  express.Router();
var notebook = require('./controller');

/**
 * Callback to be used by all actions
 */

var cb = function(err, data, res) {
  if(err) throw err;
  res.json(data);
};


/**
 * GET /
 *
 * Retrieves all notebooks
 */

router.get('/', function(req, res) {
  notebook.retrieve(req, res, cb);
});

/**
 * GET /:id
 *
 * Finds a notebook
 */

router.get('/:id', function(req, res) {
  notebook.findOne(req, res, cb);
});

/**
 * POST /
 * 
 * Creates a new notebook
 */

router.post('/', function(req, res) {
  notebook.create(req, res, cb);
}); 

/**
 * PUT /:id
 *
 * Updates a notebook
 */

router.put('/:id', function(req, res) {
  notebook.update(req, res, cb);
});


/**
 * DELETE /:id
 * 
 * Deletes a notebook
 */

router.delete('/:id', function(req, res) {
  notebook.remove(req, res, cb);
});

/**
 * Exports the router
 */

module.exports = router;