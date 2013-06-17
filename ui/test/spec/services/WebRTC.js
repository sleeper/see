'use strict';

describe('Service: WebRTC', function () {

  // load the service's module
  beforeEach(module('seeApp'));

  beforeEach(function() {

    var windowMock = {
      rtc: {
        on: function() {}
      },
    };

    module(function($provide){
      $provide.value('$window', windowMock);
    });
  });

  // instantiate service
  var WebRTC;
  beforeEach(inject(function (_WebRTC_) {
    WebRTC = _WebRTC_;
  }));

  it('should do something', function () {
    expect(!!WebRTC).toBe(true);
  });

});
