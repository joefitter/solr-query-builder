'use strict';

angular.module('luceneApp')
  .factory('lucenify', function () {

    function formatTerms(raw, field, operator) {
      var str = '', terms;
      terms = raw.split(' ');
      if(terms.length > 1){
        str += '(';
      }
      angular.forEach(terms, function (item, index) {
        if (operator) {
          str += operator;
        }
        if (field) {
          str += field + ':';
        }
        str += item;
        if(index < terms.length -1){
          str += ' ';
        }
      });
      if(terms.length > 1){
        str += ')';
      }
      return str;
    }

    function formatPhrase(raw, field, formatter, operator){
      var str = '';
      if(operator){
        str += operator;
      }
      if(field){
        str += field + ':';
      }
      str += formatter(raw);
      return str;
    }

    function addQuotes(str) {
      return '"' + str + '"';
    }

    function addSlashes(str) {
      if(str.charAt(0) !== '/'){
        str = '/' + str;
      }
      if(str.charAt(str.length -1) !== '/'){
        str = str + '/';
      }
      return str;
    }

    return function (data) {
      var str = '';
      angular.forEach(data, function(item, index){
        if(index > 0){
          str += ' AND ';
        }
        angular.forEach(item, function(thing, i){
          if(i === 0 && item.length > 1){
            str += '(';
          }
          if(i > 0){
            str += ' OR ';
          }
          switch(thing.type){
          case 'matches phrase':
            str += formatPhrase(thing.q, thing.field, addQuotes);
            break;
          case 'doesn\'t match phrase':
            str += formatPhrase(thing.q, thing.field, addQuotes, '-');
            break;
          case 'contains any of':
            str += formatTerms(thing.q, thing.field);
            break;
          case 'contains none of':
            str += formatTerms(thing.q, thing.field, '-');
            break;
          case 'contains all of':
            str += formatTerms(thing.q, thing.field, '+');
            break;
          case 'matches regex':
            str += formatPhrase(thing.q, thing.field, addSlashes);
            break;
          case 'doesn\'t match regex':
            str += formatPhrase(thing.q, thing.field, addSlashes, '-');
            break;
          }
          if(i === item.length -1 && item.length > 1){
            str += ')';
          }
        });
      });
      return str;
    };
  });