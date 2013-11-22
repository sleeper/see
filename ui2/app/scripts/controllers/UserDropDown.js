'use strict';

angular.module('ui2App')
  .controller('UserDropDownCtrl', function ($scope, AuthService) {
    $scope.userLoggedIn = function() { return AuthService.userLoggedIn(); };
    $scope.currentUser = AuthService.currentUser();
  });
