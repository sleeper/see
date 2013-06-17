'use strict';

angular.module('seeApp')
  .factory('WebRTC', function () {
    var WebSocketServerAddr = "ws://0.0.0.0:8001"
    // Our WebRTC.io hook
    var rtc = window.rtc;
    var URL = window.URL;
    var onRemoteConnectCb;
    var onRemoteDisconnectCb;

    rtc.on('add remote stream', function(stream, socketId) {
      if (onRemoteConnectCb) {
        onRemoteConnectCb(stream, socketId);
      } else {
        console.log("Watch out: no onRemoteConnect function registered.")
      }
    });

    rtc.on('disconnect stream', function(socketId) {
      if (onRemoteDisconnectCb) {
        onRemoteDisconnectCb(socketId);
      } else {
        console.log("Watch out: no onRemoteDisconnect function registered.")
      }
    });

    // Public API here
    return {
      connect: function (roomName, element) {
        console.log('About to connect to %s and hook it up to ', roomName, element);

        rtc.createStream({
          'video': true,
          'audio': true
        }, function (stream) {
          element.src = URL.createObjectURL(stream);
          element.volume = 0;
        });
        rtc.connect(WebSocketServerAddr, roomName);
      },

      // When a remote peer is connecting the furnished callback
      // will be called with the stream and socketId as parameters
      onRemoteConnect: function(callback){
        onRemoteConnectCb = callback;
      },

      // When a remote peer is disconnecting the furnished callback
      // will be called with the socketId as parameters
      onRemoteDisconnect: function(callback) {
        onRemoteDisconnectCb = callback;
      }
    };
  });
