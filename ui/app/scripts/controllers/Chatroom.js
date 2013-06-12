'use strict';

angular.module('seeApp')
  .controller('ChatroomCtrl', function ($scope, $routeParams) {
    $scope.name = $routeParams.name;
  });
