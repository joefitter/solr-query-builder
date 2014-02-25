'use strict';

angular.module('luceneApp')
  .controller('PanelCtrl', function ($scope) {

    var mainCtrl = $scope.$parent.$parent;

    $scope.index = parseInt($scope.index, 10);

    $scope.type = mainCtrl.type;
    $scope.and = mainCtrl.and;
    $scope.length = mainCtrl.parameters.length;

    $scope.searchgroup = $scope.model;

    function resetModel(){
      $scope.searchline = {
        type: $scope.type[1]
      };
    }

    function addToSearchGroup() {
      resetModel();
      $scope.searchgroup.push($scope.searchline);
    }

    $scope.or = function(){
      addToSearchGroup();
    };

    $scope.remove = function(item) {
      var index = $scope.searchgroup.indexOf(item);
      if(index === 0 && $scope.searchgroup.length === 1){
        mainCtrl.remove($scope.model);
      } else {
        $scope.searchgroup.splice(index, 1);
      }
      
    };
  });