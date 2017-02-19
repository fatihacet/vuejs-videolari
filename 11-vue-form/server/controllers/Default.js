'use strict';

var url = require('url');

var Default = require('./DefaultService');

module.exports.labelsAdd = function labelsAdd (req, res, next) {
  Default.labelsAdd(req.swagger.params, res, next);
};

module.exports.labelsGet = function labelsGet (req, res, next) {
  Default.labelsGet(req.swagger.params, res, next);
};

module.exports.labelsRemove = function labelsRemove (req, res, next) {
  Default.labelsRemove(req.swagger.params, res, next);
};
