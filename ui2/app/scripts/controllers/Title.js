'use strict';

angular.module('ui2App')
  .controller('TitleCtrl', function ($scope, Page) {
    $scope.$watch( Page.title, function ( title ){
      $scope.title = title;
    });

    $scope.title = Page.title();

  });
