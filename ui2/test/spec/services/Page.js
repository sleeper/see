'use strict';

describe('Service: Page', function () {

  // load the service's module
  beforeEach(module('ui2App'));

  // instantiate service
  var Page;
  beforeEach(inject(function (_Page_) {
    Page = _Page_;
  }));

  it('should return the default title', function () {
    expect(Page.title()).toBe('');
  });

  it('should set title', function () {
    Page.setTitle('foo');
    expect(Page.title()).toBe('foo');
  });


});
