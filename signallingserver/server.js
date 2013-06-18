'use strict';
var express = require('express');
var manager = require('webrtc.io').listen(8001);

var app = express();

app.use(function(req, res, next) {
  var oneof = false;
  if(req.headers.origin) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    oneof = true;
  }
  if(req.headers['access-control-request-method']) {
    res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
    oneof = true;
  }
  if(req.headers['access-control-request-headers']) {
    res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
    oneof = true;
  }
  if(oneof) {
    res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
  }

  // intercept OPTIONS method
  if (oneof && req.method === 'OPTIONS') {
    res.send(200);
  }
  else {
    next();
  }
});
app.use(express.bodyParser());

app.get('/rooms', function(req, res) {
  console.log('/rooms called');
  res.send({
    chatrooms: [{
      name: 'Friends',
      userCount: 5
    },
    {
      name: 'Talking heads',
      userCount: 3
    }]
  });
});

app.post('/rooms', function(req,res) {
  var name = req.body.name;
  console.log('Creating room %s', name);
  res.send(200);
});

app.listen(8002);

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
