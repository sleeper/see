'use strict';

angular.module('ui2App')
  .service('Webrtc', function Webrtc() {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.create = function(cfg) {
      this.webrtc = new SimpleWebRTC(cfg);
      this.connection = this.webrtc.connection;
    };

    this.on = function(event, callback) {
      var target = this.webrtc;

      // localStream is not sent by SimpleWebRTC but by th eunderlying system
      if (event === 'localStream') {
        target = this.webrtc.webrtc;
      }

      target.on(event, callback);
    };
    this.joinRoom = function(name) {
      this.webrtc.joinRoom(name);
    };
    this.leaveRoom = function() {
      this.webrtc.leaveRoom();
      this.webrtc.stopLocalVideo();
    };
  });
