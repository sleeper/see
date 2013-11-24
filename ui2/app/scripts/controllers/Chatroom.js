'use strict';

angular.module('ui2App')
  .controller('ChatroomCtrl', function ($scope, $routeParams, $location, Page, Webrtc) {
    $scope.hideWarning = false;
    $scope.peersCounter = 0;
    $scope.name = $routeParams.name;
    Page.setTitle($scope.name);

    $scope.quit = function() {
      // Let's get out of this chatroom
      // WebRTC.disconnect();
      Webrtc.leaveRoom();
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

    Webrtc.create({
      url: 'http://0.0.0.0:8888/signalling',
      // the id/element dom element that will hold "our" video
      localVideoEl: 'selfVideo',
      // the id/element dom element that will hold remote videos
      remoteVideosEl: 'videos',
      // immediately ask for camera access
      autoRequestMedia: true
    });

    // Remove warning when local stream is acquired
    Webrtc.on('localStream', function() {
      $scope.$apply(function() {
        $scope.hideWarning = true;
      });
      console.log('FRED ---->1');

    });

    // we have to wait until it's ready
    Webrtc.on('readyToCall', function () {
      console.log('FRED ---->2');
      // you can name it anything
      Webrtc.joinRoom($scope.name);
    });

    Webrtc.on('videoAdded', function() {
      $scope.$apply(function() {
        $scope.peersCounter += 1;
      });
      resizeVideos();
    });

    Webrtc.on('videoRemoved', function() {
      $scope.$apply(function() {
        $scope.peersCounter -= 1;
      });
      resizeVideos();
    });

    // WebRTC.connect($scope.name, document.getElementById('selfVideo'));

    // Handle the connection from remote peers
    // WebRTC.onRemoteConnect(function(stream,socketId) {
    //   // Add a place where to hook the videos elements
    //   // attach the stream
    //   console.log('Remote peer %s is connecting ...', socketId);
    //   $scope.peersCounter += 1;

    //   $('#videos').append($('<video id="' + socketId + '" autoplay></video>'));
    //   resizeVideos();
    //   window.rtc.attachStream(stream, socketId);
    // });

    // Handle remote disconnection
    // WebRTC.onRemoteDisconnect(function(socketId) {
    //   // Remove the video element
    //   console.log('Remote peer %s is discconnecting ...', socketId);
    //   $scope.peersCounter -= 1;
    //   $('#' + socketId).remove();
    //   resizeVideos();

    // });
  });
