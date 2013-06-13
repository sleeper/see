'use strict';

angular.module('seeApp')
  .controller('ChatroomsListCtrl', function ($scope, Page) {
    $scope.chatrooms = [{
      name: 'Friends',
      userCount: 5
    },
    {
      name: 'Talking heads',
      userCount: 3
    }];
    Page.setTitle('');
  });
