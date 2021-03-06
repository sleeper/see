'use strict';

angular.module('seeApp')
  .controller('ChatroomCtrl', function ($scope, $routeParams, $location, Page, WebRTC) {
    $scope.peersCounter = 0;
    $scope.name = $routeParams.name;
    Page.setTitle($scope.name);

    $scope.quit = function() {
      // Let's get out of this chatroom
      WebRTC.disconnect();
      $('selfVideo').src = '';
      $location.path('/');
    };

    var resizeVideos = function() {
      var videoElements = $('#videos').children();
      var width;

      if ($scope.peersCounter !== 0) {
        width = (Math.ceil( 100 / $scope.peersCounter) - 1)+ '%';
      } else {
        width = '100%';
      }
      console.log('New width: %s', width);
      videoElements.width(width);
    };

    WebRTC.connect($scope.name, document.getElementById('selfVideo'));

    // Handle the connection from remote peers
    WebRTC.onRemoteConnect(function(stream,socketId) {
      // Add a place where to hook the videos elements
      // attach the stream
      console.log('Remote peer %s is connecting ...', socketId);
      $scope.peersCounter += 1;

      $('#videos').append($('<video id="' + socketId + '" autoplay></video>'));
      resizeVideos();
      window.rtc.attachStream(stream, socketId);
    });

    // Handle remote disconnection
    WebRTC.onRemoteDisconnect(function(socketId) {
      // Remove the video element
      console.log('Remote peer %s is discconnecting ...', socketId);
      $scope.peersCounter -= 1;
      $('#' + socketId).remove();
      resizeVideos();

    });
  });
