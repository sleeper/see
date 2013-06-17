'use strict';

var manager = require('webrtc.io').listen(8001);

manager.rtc.on('get_rooms_list', function(data, socket) {
  console.log('FRED -> room_list received');
  socket.send(JSON.stringify({
    'eventName': 'rooms_list',
    'data': {
      id: data.id,
      chatrooms: [{
        name: 'Friends',
        userCount: 5
      },
      {
        name: 'Talking heads',
        userCount: 3
      }]
    }
  }));
});

manager.rtc.on('create_room', function(data, socket) {
  console.log('FRED -> create_room received');
  // FIXME: Create room ;)

  socket.send(JSON.stringify({
    'eventName': 'room_created',
    'data': {
      id: data.id,
      name: data.name,
    }
  }));

});
