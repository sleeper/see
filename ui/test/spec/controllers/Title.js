'use strict';

describe('Controller: TitleCtrl', function () {

  // load the controller's module
  beforeEach(module('seeApp'));

  var TitleCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TitleCtrl = $controller('TitleCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.title);
  });
});
