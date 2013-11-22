'use strict';

angular.module('ui2App')
  .factory('Chatrooms', ['$resource', function ($resource) {
    return $resource('http://0.0.0.0\\:3000/rooms/:roomId');
  }]);
