'use strict';

describe('Controller: ChatroomCtrl', function () {

  // load the controller's module
  beforeEach(module('seeApp'));

  var ChatroomCtrl, scope;
  var mockRouteParams = {
    name: "foo"
  };
  var webRTCMock = {
    connect: function() {},
    onRemoteConnect: function() {},
    onRemoteDisconnect: function() {}
  };

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChatroomCtrl = $controller('ChatroomCtrl', {
      $scope: scope,
      $routeParams: mockRouteParams,
      WebRTC: webRTCMock
    });
  }));

  it('should attach a name to the scope', function () {
    expect(scope.name).toEqual('foo');
  });
});
