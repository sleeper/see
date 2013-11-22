'use strict';

describe('Controller: ChatroomsListCtrl', function () {

  // load the controller's module
  beforeEach(module('ui2App'));

  var ChatroomsListCtrl,
    scope, newRoom;

  beforeEach(module(function($provide) {
      var chatrooms = {
          query: function () {
            return ['foo', 'bar'];
          },
          save: function(room, f) {
            newRoom = room;
          }
      };
      var page = {
        setTitle: function(t) {}
      };

      $provide.value('Chatrooms', chatrooms);
      $provide.value('Page', page);
  }));

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChatroomsListCtrl = $controller('ChatroomsListCtrl', {
      $scope: scope
    });
  }));

  it('should export the list of chatrooms', function () {
    expect(scope.chatrooms.length).toBe(2);
    expect(scope.chatrooms[0]).toBe('foo');
    expect(scope.chatrooms[1]).toBe('bar');
  });

  it('shoud save newly created chatroom', function() {
    scope.createRoom('myroom').then(function() {
    expect(newRoom).toBe('myRoom');
    });
  })
});
