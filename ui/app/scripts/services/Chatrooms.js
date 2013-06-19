'use strict';

angular.module('seeApp')
  .factory('Chatrooms', ['$resource', function ($resource) {
    return $resource('http://0.0.0.0\\:8002/rooms/:roomId');
  }]);
