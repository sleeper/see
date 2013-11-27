'use strict';

angular.module('ui2App').config(function ($provide) {
  $provide.constant('WebrtcConfig', {
      url: 'http://0.0.0.0:8888/signalling',
      // the id/element dom element that will hold "our" video
      localVideoEl: 'selfVideo',
      // the id/element dom element that will hold remote videos
      remoteVideosEl: 'videos',
      // immediately ask for camera access
      autoRequestMedia: true,
      adjustPeerVolume: true
    });
});
