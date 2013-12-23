'use strict';

describe('Service: Webrtc', function () {

  // load the service's module
  beforeEach(module('ui2App'));

  // instantiate service
  var Webrtc;
  beforeEach(inject(function (_Webrtc_) {
    Webrtc = _Webrtc_;
  }));

  it('should use SimpleWebRTC', function () {
    // Webrtc.create({});
    expect(Webrtc.webrtc).not.toBeUndefined();
  });

  it('should deffer on to SimpleWebRTC', function() {
    // Webrtc.create({});
    spyOn(Webrtc.webrtc, 'on');
    Webrtc.on('videoAdded', function() {});
    expect(Webrtc.webrtc.on).toHaveBeenCalled();
  });
});
