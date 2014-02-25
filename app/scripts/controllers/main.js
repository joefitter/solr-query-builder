'use strict';

angular.module('luceneApp')
  .controller('MainCtrl', ['$scope', '$http', 'lucenify', function ($scope, $http, lucenify) {

    $http.get('/api/search').success(function(data){
      $scope.records = data.response.docs;
    });

    $http.get('/api/fields').success(function(fields){
      $scope.fields = fields;
    });

    $scope.advanced = true;

    $scope.type = [
      'matches phrase',
      'doesn\'t match phrase',
      'contains any of',
      'contains none of',
      'contains all of',
      'matches regex',
      'doesn\'t match regex'
    ];

    $scope.searchline = {
      type: $scope.type[2]
    };

    $scope.searchgroup = [$scope.searchline];
    $scope.parameters = [$scope.searchgroup];

    function resetModel(){
      $scope.searchline = {
        type: $scope.type[2]
      };
    }

    $scope.remove = function(searchgroup){
      var index = $scope.parameters.indexOf(searchgroup);
      $scope.parameters.splice(index, 1);
    };

    function resetSearchgroup() {
      $scope.searchgroup = [$scope.searchline];
    }

    function addToParameters() {
      resetModel();
      resetSearchgroup();
      $scope.parameters.push($scope.searchgroup);
    }

    $scope.and = function(model){
      addToParameters(model);
    };

    $scope.toggleAdvanced = function(){
      $scope.advanced = !$scope.advanced;
    };

    $scope.go = function(){
      var q = lucenify($scope.parameters);
      $http({
        url: '/api/search',
        method: 'GET',
        params: {q: q}
      }).success(function(data){
        $scope.records = data.response.docs;
      });
    };

    $scope.reset = function() {
      $http.get('/api/search').success(function(data){
        $scope.records = data.response.docs;
      });
      resetModel();
      resetSearchgroup();
      $scope.parameters = [$scope.searchgroup];
    };

  }]);
