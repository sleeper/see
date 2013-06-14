'use strict';

angular.module('seeApp')
  .controller('ChatroomCtrl', function ($scope, $routeParams, Page, WebRTC) {

    $scope.name = $routeParams.name;
    Page.setTitle($scope.name);

    WebRTC.connect($scope.name, document.getElementById('selfVideo'));

    // Handle the connection from remote peers
    WebRTC.onRemoteConnect(function(stream,socketId) {
      // Add a place where to hook the videos elements
      // attach the stream
      console.log('Remote peer %s is connecting ...', socketId);
      $('#videos').append($('<video id="' + socketId + '" autoplay></video>'));
      window.rtc.attachStream(stream, socketId);
    });

    // Handle remote disconnection
    WebRTC.onRemoteDisconnect(function(socketId) {
      // Remove the video element
      console.log('Remote peer %s is discconnecting ...', socketId);
      $('#' + socketId).remove();
    });
  });
