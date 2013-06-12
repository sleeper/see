'use strict';

describe('Controller: UserDropDownCtrl', function () {

  // load the controller's module
  beforeEach(module('seeApp'));

  var UserDropDownCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserDropDownCtrl = $controller('UserDropDownCtrl', {
      $scope: scope
    });
  }));

  it('should attach a currentUser to the scope', function () {
    expect(scope.currentUser);
  });

  it('should attach a userLoggedIn to the scope', function () {
    expect(scope.userLoggedIn);
  });
});
