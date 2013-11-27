'use strict';

angular.module('ui2App')
  .controller('MessagesCtrl', function ($scope, AuthService, Webrtc) {

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

  $scope.newMessage = {body: '', author: AuthService.currentUser()};

  $scope.send = function() {
    var msg = { author: '', body: ''};
    
    msg.author = $scope.newMessage.author;
    msg.body = $scope.newMessage.body;
    $scope.newMessage.body = '';

    // Add your message locally
    $scope.messages.push(msg);
    // And send it
    Webrtc.sendMessage(msg);
  };

  // Webrtc.connection.on('newMessage', function(data) {
  Webrtc.onNewMessage(function(data) {  
    console.log('FRED: MESSAGE RECEIVED');
    $scope.$apply(function() {
      $scope.messages.push(data);
    });
  });
});
