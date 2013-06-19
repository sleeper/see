'use strict';

angular.module('seeApp')
  .controller('ChatroomsListCtrl', function ($scope, $location, Page, Chatrooms) {

    Page.setTitle('');

    $scope.chatrooms = Chatrooms.query();

    $scope.createRoom = function() {
      // Check if new chatroom does not exist yet
      // Then ask for creation and then move to it
      Chatrooms.save($scope.newChatroom, function() {
        $location.path('/chatrooms/' + $scope.newChatroom.name);
      });

    };
  });
