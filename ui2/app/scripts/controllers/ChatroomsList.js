'use strict';

angular.module('ui2App')
  .controller('ChatroomsListCtrl', function ($scope, $location, $q, Page, Chatrooms, News) {

    $scope.chatrooms = Chatrooms.query();

    var findRoom = function(name) {
      var rooms = $scope.chatrooms.filter(function(v) { if (v.name === name) { return true;}}) || [];
      return rooms[0];
    };

    Page.setTitle('default title');

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

    News.onRoomUpdate(function(data) {
      console.log('FRED: Room '+data.name+' update: ' + data.userCount + ' users in');
      // Get room object and update count
      var room = findRoom(data.name);
      if (room) {
        // If there's anybody in the room --> remove it
        if (data.userCount === 0 ) {
          var index = ($scope.chatrooms.map(function(v,i) { if (v.name === data.name) { return i;}}) || [])[0];
          if (index > -1) {
            $scope.chatrooms.splice(index, 1);
          }
        }
        room.userCount = data.userCount;
      } else {
        $scope.chatrooms.push({name: data.name, userCount: data.userCount});
      }
    });

    // News.on('enteringRoom', function(data) {
    //   console.log('FRED: '+data.name+' is entering room ' + data.room);
    //   // Get room object and update count
    //   var room = findRoom(data.room);
    //   if (room) {
    //     room.userCount += 1;
    //   }
    // });

    // News.on('leavingRoom', function(data) {
    //   console.log('FRED: '+data.name+' is leaving room ' + data.room);
    //   var room = findRoom(data.room);
    //   if (room) {
    //     room.userCount -= 1;
    //   }
    // });

  });
