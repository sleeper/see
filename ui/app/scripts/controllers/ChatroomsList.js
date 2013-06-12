'use strict';

angular.module('seeApp')
  .controller('ChatroomsListCtrl', function ($scope) {
    $scope.chatrooms = [{
      name: 'Friends',
      userCount: 5
    },
    {
      name: 'Talking heads',
      userCount: 3
    }];
  });
