'use strict';
var _ = require('lodash');
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

var getRoomList = function(manager) {
  var rooms = manager.rtc.rooms;
  var roomList = _.map(rooms, function(sockets, name) {
    return { name: name, userCount: sockets.length };
  });
  return roomList;
};

app.get('/rooms', function(req, res) {
  console.log('/rooms called');
  // var rooms = manager.rtc.rooms;
  // var roomList = _.map(rooms, function(sockets, name) {
  //   return { name: name, userCount: sockets.length };
  // });
  var roomList = getRoomList(manager);
  console.log('[/rooms]: returning ', roomList);
  res.send(roomList);
});

app.post('/rooms', function(req,res) {
  var name = req.body.name;
  console.log('Creating room %s', name);
  // FIXME: Check the room does not yet exist
  manager.rtc.rooms[name] = [];
  res.send(200);
});

app.listen(8002);

manager.rtc.on('join_room', function(data, socket) {
  console.log('FRED: join_room called');
});

manager.rtc.on('room_leave', function(data, socket) {
  // If one room is empty, remove it
  var rooms = {};
  _.each(manager.rtc.rooms, function(sockets,name) {
    if (sockets.length !== 0) {
      rooms[name] = sockets;
    }
  });
  manager.rtc.rooms = rooms;

  // Broadcast to all connected peers
  var roomList = getRoomList(manager);
  _.each(manager.rtc.sockets, function(sock) {
    sock.send(JSON.stringify({
      'eventName': 'rooms_list',
      'data': {
        'roomsList': roomList
      }
    }));
  });

  console.log('FRED: Rooms: ', roomList);
});
