'use strict';

describe('Controller: TitleCtrl', function () {

  // load the controller's module
  beforeEach(module('ui2App'));

  var TitleCtrl,
    scope;

  beforeEach(module(function($provide) {
      var page = {
          title: function () {
            return 'foo';
          }
      };
      $provide.value('Page', page);
  }));

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TitleCtrl = $controller('TitleCtrl', {
      $scope: scope
    });
  }));

  it('should export the title of the page', function () {
    expect(scope.title).toBe('foo');
  });
});
