'use strict';

angular.module('ui2App')
  .controller('MessagesCtrl', function ($scope) {
      $scope.messages = [
        {
          author: 'you',
          body: 'Hi there !'
        },
        {
          author: 'julien',
          body: 'How are you ?'
        }
      ];
    });
