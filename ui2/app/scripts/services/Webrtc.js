'use strict';

angular.module('ui2App')
  .service('Webrtc', function Webrtc(WebrtcConfig) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    // this.create = function(cfg) {
    this.webrtc = new SimpleWebRTC(WebrtcConfig);
    this.connection = this.webrtc.connection;
    // };

    this.on = function(event, callback) {
      var target = this.webrtc;

      // localStream is not sent by SimpleWebRTC but by the underlying system
      if (event === 'localStream') {
        target = this.webrtc.webrtc;
      }

      target.on(event, callback);
    };

    this.onNewMessage = function(cb) {
      this.connection.on('newMessage', cb);
    };

    this.joinRoom = function(name) {
      this.webrtc.joinRoom(name);
    };
    this.leaveRoom = function() {
      this.webrtc.leaveRoom();
      this.webrtc.stopLocalVideo();
    };

    this.sendMessage = function(msg) {
      console.log('FRED: sending msg to connection ', msg);
      this.connection.emit('newMessage', msg);
    };
  });
