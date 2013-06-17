'use strict';

describe('Controller: ChatroomsListCtrl', function () {

  // load the controller's module
  beforeEach(module('seeApp'));

  var ChatroomsListCtrl,
    scope;

  var locationMock = {
    _path: "",
    path: function(p) { _path = p; },
    _getPath: function() { return p; }
  };

  var pageMock = {
    _title: "foo",
    setTitle: function(t) { this._title = t;},
    _getTitle: function() { return this._title; }
  };

  var chatroomsMock = {
    getChatrooms: function(cb){
      cb([{ name: 'foo', userCount: 2}]);
    },
    createChatroom: function(name, cb) {

    }
  };


  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChatroomsListCtrl = $controller('ChatroomsListCtrl', {
      $scope: scope,
      $location: locationMock,
      Page: pageMock,
      Chatrooms: chatroomsMock
    });
  }));

  it('should attach a list of chatrooms to the scope', function () {
    expect(scope.chatrooms);
  });

  it('should set an empty title', function() {
    expect(pageMock._getTitle()).toEqual("");
  });

  it('should set the list of chatrooms', function() {
    expect(scope.chatrooms).toBeDefined();
    expect(scope.chatrooms.length).toEqual(1);
    var chatroom = scope.chatrooms[0];

    expect(chatroom.name).toEqual('foo');
    expect(chatroom.userCount).toEqual(2);
  });
});
