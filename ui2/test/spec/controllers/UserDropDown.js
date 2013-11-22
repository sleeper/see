'use strict';

describe('Controller: UserDropDownCtrl', function () {

  // load the controller's module
  beforeEach(module('ui2App'));

  var UserDropDownCtrl,
    scope;

  beforeEach(module(function($provide) {
      var auth = {
          userLoggedIn: function () { return true;},
          currentUser: function() { return 'fred';}
      };
      $provide.value('AuthService', auth);
  }));

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserDropDownCtrl = $controller('UserDropDownCtrl', {
      $scope: scope
    });
  }));

  it('should export the current user', function () {
    expect(scope.currentUser).toBe('fred');
  });

  it('should check user is logged', function () {
    expect(scope.userLoggedIn()).toBe(true);
  });

});
