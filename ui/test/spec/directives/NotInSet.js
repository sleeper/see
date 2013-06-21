'use strict';

describe('Directive: NotInSet', function () {
  beforeEach(module('seeApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<-not-in-set></-not-in-set>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the NotInSet directive');
  }));
});
