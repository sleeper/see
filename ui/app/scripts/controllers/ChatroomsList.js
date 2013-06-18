'use strict';

angular.module('seeApp')
  .controller('ChatroomsListCtrl', function ($scope, $location, Page, Chatrooms) {
    // Chatrooms.getChatrooms( function(chatrooms) {
    //   $scope.chatrooms = chatrooms;
    //   $scope.$apply();
    // });
    Page.setTitle('');
    $scope.chatrooms = Chatrooms.getChatrooms();
console.log('FRED ', $scope.chatrooms);
    $scope.createRoom = function() {
      // Check if new chatroom does not exist yet
      // Then ask for creation and then move to it
      Chatrooms.createChatroom( $scope.newChatroom.name, function(chatroom) {
        console.log('FRED: Chatroom %s created', $scope.newChatroom.name);
        // console.log('Chatroom created.');
        // $location.path('/chatrooms/' + chatroom);
        // $scope.$apply();
        // console.log('Path: ', $location.path());
      });
    };
  });
