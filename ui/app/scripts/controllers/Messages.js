'use strict';

angular.module('seeApp')
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
