'use strict';

var config = require('getconfig'),
  uuid = require('node-uuid'),
  express = require('express'),
  io = require('socket.io').listen(config.server.socket.port);


function safeCb(cb) {
  if (typeof cb === 'function') {
    return cb;
  } else {
    return function () {};
  }
}

function getSignallingRooms() {
  var rooms = [];
  var re = /\/signalling\/(.+)$/;
  for (var room in io.rooms) {
    // if (room.match('\/signalling\/')) {
    var m = re.exec(room);
    if (m) {
      rooms.push({name: m[1], userCount: io.rooms[room].length});
    }
  }
  return rooms;
}


io.of('/signalling').on('connection', function (client) {
  var signallingChannel = io.of('/signalling');

  client.resources = {
    screen: false,
    video: true,
    audio: false
  };

    // pass a message to another id
  client.on('message', function (details) {
    var otherClient = signallingChannel.sockets[details.to];
    if (!otherClient) {
      return;
    }
    details.from = client.id;
    otherClient.emit('message', details);
  });

  client.on('shareScreen', function () {
    client.resources.screen = true;
  });

  client.on('unshareScreen', function () {
    client.resources.screen = false;
    if (client.room) {
      removeFeed('screen');
    }
  });

  client.on('join', join);

  function describeRoom(name) {
    var clients = signallingChannel.clients(name);
    var result = {
        clients: {}
      };
    clients.forEach(function (client) {
        result.clients[client.id] = client.resources;
      });
    return result;
  }

  function removeFeed(type) {
    var name = client.room;

    signallingChannel.in(name).emit('remove', {
      id: client.id,
      type: type
    });
    client.leave(name);
    var clients = signallingChannel.clients(name);
    io.of('/news').emit('roomUpdate', { name: name, userCount: clients.length});
  }

  function join(name, cb) {
    console.log('FRED: joining room ' + name);
    // sanity check
    if (typeof name !== 'string') {
      return;
    }
    // leave any existing rooms
    if (client.room) {
      removeFeed();
    }
    safeCb(cb)(null, describeRoom(name));
    client.join(name);
    client.room = name;
    var clients = signallingChannel.clients(name);
    console.log('FRED --> rooms: ', getSignallingRooms());
    console.log('FRED (join): roomUpdate -> room ' + name + ' users: ' + clients.length );
    io.of('/news').emit('roomUpdate', { name: name, userCount: clients.length});
  }

  // we don't want to pass "leave" directly because the
  // event type string of "socket end" gets passed too.
  client.on('disconnect', function () {
    // io.of('/news').emit('leavingRoom', { name: 'fred', room: room});
    // var name = client.room;
    removeFeed();
    // client.leave(client.room);
    // var clients = signallingChannel.clients(name);
    // console.log('FRED (disconnect): roomUpdate -> room ' + name + ' users: ' + clients.length );
    // io.of('/news').emit('roomUpdate', { name: name, userCount: clients.length});
  });

  client.on('leave', function() {
    removeFeed();
    // client.leave(client.room);
    // var clients = signallingChannel.clients(name);
    // console.log('FRED (leave): roomUpdate -> room ' + name + ' users: ' + clients.length );
    // io.of('/news').emit('roomUpdate', { name: name, userCount: clients.length});
  });

  client.on('create', function (name, cb) {
    if (arguments.length === 2) {
      cb = (typeof cb === 'function') ? cb : function () {};
      name = name || uuid();
    } else {
      cb = name;
      name = uuid();
    }
    // check if exists
    if (signallingChannel.clients(name).length) {
      safeCb(cb)('taken');
    } else {
      join(name);
      safeCb(cb)(null, name);
    }
  });
});

if (config.uid) {
  process.setuid(config.uid);
}

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // intercept OPTIONS method
    if ('OPTIONS' === req.method) {
      res.send(200);
    }
    else {
      next();
    }
  };

var app = express();
app.use(express.methodOverride());
app.use(allowCrossDomain);

app.get('/rooms', function(req, res){
  console.log('FRED: get all rooms ');
  // var chatrooms = [{name: 'the eden', userCount: 1}, {name: 'the water cooler', userCount: 0}];
  var chatrooms = getSignallingRooms();
  res.json(chatrooms);
});

app.get('/rooms/:roomId', function(req, res){
  console.log('FRED: rooms ', req.params.roomId);
  var body = 'Hello World';
  res.send(body);
});

app.post('/rooms', function(req, res){
  console.log('FRED: creating room ', req.params.roomId);
  res.send();
});

app.listen(config.server.rest.port);

console.log(' -- signal master is running at: http://localhost:' + config.server.socket.port);
console.log(' -- REST API is running at: http://localhost:' + config.server.rest.port);
