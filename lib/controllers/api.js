'use strict';

var rest = require('../utils/rest');

exports.fields = function(req, res) {
  res.json([
    'id',
    'name',
    'manu',
    'manu_id',
    'cat',
    'features',
    'price',
    'price_c',
    'popularity',
    'manufacturedate_dt',
    'in_stock',
    'store',
    '_version'
  ]);
};

exports.search = function(req, res) {
  var q = req.query.q || '*';
  q = encodeURIComponent(q);
  var options = {
    host: 'localhost',
    port: 8983,
    path: '/solr/collection1/select?q='+q+'&wt=json&indent=true',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  rest.getJSON(options, function(statusCode, json){
    res.json(json);
  });
};