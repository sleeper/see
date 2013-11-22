'use strict';

describe('Service: Chatrooms', function () {
  var mockUserResource, $httpBackend;

  // load the service's module
  beforeEach(module('ui2App'));

  beforeEach(function () {
      angular.mock.inject(function ($injector) {
          $httpBackend = $injector.get('$httpBackend');
      })
  });

  // instantiate service
  var Chatrooms;
  beforeEach(inject(function (_Chatrooms_) {
    Chatrooms = _Chatrooms_;
  }));

  it('should call GET rooms', function () {
    $httpBackend.expectGET('http://0.0.0.0:3000/rooms').respond(['foo', 'bar']);
    var rooms = Chatrooms.query();
    $httpBackend.flush();
    expect(rooms.length).toBe(2);
  });

});
