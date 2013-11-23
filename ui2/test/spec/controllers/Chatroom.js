'use strict';

describe('Controller: ChatroomCtrl', function () {

  // load the controller's module
  beforeEach(module('ui2App'));

  var ChatroomCtrl, pageTitle,
    scope;

  beforeEach(module(function($provide) {
    var routeParams = {
      name: 'myroom'
    };

    var location = {
      path: function() {}
    };
    var page = {
      setTitle: function(t) { pageTitle = t;}
    };
    var webrtc = {
      create: function() {

      },
      on: function() {

      }
    };

    $provide.value('$routeParams', routeParams);
    $provide.value('$location', location);
    $provide.value('Page', page);
    $provide.value('Webrtc', webrtc);
  }));

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChatroomCtrl = $controller('ChatroomCtrl', {
      $scope: scope
    });
  }));

  it('should export the name of the room', function () {
    expect(scope.name).toBe('myroom');
  });

  it('should set Page name to the room name', function () {
    expect(pageTitle).toBe('myroom');
  });

});
