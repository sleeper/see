'use strict';

angular.module('seeApp')
  .controller('UserDropdownCtrl', function ($scope, AuthService) {
    $scope.userLoggedIn = function() { return AuthService.userLoggedIn(); };
    $scope.currentUser = AuthService.currentUser();
  });
