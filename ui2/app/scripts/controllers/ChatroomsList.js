'use strict';

angular.module('ui2App')
  .controller('ChatroomsListCtrl', function ($scope, $location, $q, Page, Chatrooms) {

    Page.setTitle('default title');

    $scope.chatrooms = Chatrooms.query();

    $scope.createRoom = function() {
      var deferred = $q.defer();

      // Check if new chatroom does not exist yet
      // Then ask for creation and then move to it
      Chatrooms.save($scope.newChatroom, function() {
        $location.path('/chatrooms/' + $scope.newChatroom.name);
        deferred.resolve();
      });
      return deferred.promise;
    };
  });
