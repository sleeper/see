'use strict';

angular.module('ui2App')
  .service('News', function News($rootScope) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var urlForNews = 'http://0.0.0.0:8888/news';
    var socket = io.connect(urlForNews);

    this.on = function (eventName, callback) {
      socket.on(eventName, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    };

    this.emit = function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      });
    };
  });
