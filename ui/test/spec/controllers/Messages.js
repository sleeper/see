'use strict';

describe('Controller: MessagesCtrl', function () {

  // load the controller's module
  beforeEach(module('seeApp'));

  var MessagesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MessagesCtrl = $controller('MessagesCtrl', {
      $scope: scope
    });
  }));

  it('should attach a messages array to the scope', function () {
    expect(scope.messages);
  });
});
