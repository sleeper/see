'use strict';

describe('Service: AuthService', function () {

  // load the service's module
  beforeEach(module('ui2App'));

  // instantiate service
  var AuthService;
  beforeEach(inject(function (_AuthService_) {
    AuthService = _AuthService_;
  }));

  it('should return logged user', function () {
    expect(AuthService.currentUser()).toBe('fred');
  });

  it('should return if user is logged in', function () {
    expect(AuthService.userLoggedIn()).toBe(true);
  });

});
