'use strict';

describe('Controller: ChatroomsListCtrl', function () {

  // load the controller's module
  beforeEach(module('seeApp'));

  var ChatroomsListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChatroomsListCtrl = $controller('ChatroomsListCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of chatrooms to the scope', function () {
    expect(scope.chatrooms);
  });
});
