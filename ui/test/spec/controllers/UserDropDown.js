'use strict';

describe('Controller: UserDropDownCtrl', function () {

  // load the controller's module
  beforeEach(module('uiApp'));

  var UserDropDownCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserDropDownCtrl = $controller('UserDropDownCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
