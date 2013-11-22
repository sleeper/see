'use strict';

var config = require('getconfig'),
  uuid = require('node-uuid'),
  express = require('express'),
  io = require('socket.io').listen(config.server.socket.port);

function describeRoom(name) {
  var clients = io.sockets.clients(name);
  var result = {
      clients: {}
    };
  clients.forEach(function (client) {
      result.clients[client.id] = client.resources;
    });
  return result;
}

function safeCb(cb) {
  if (typeof cb === 'function') {
    return cb;
  } else {
    return function () {};
  }
}

io.sockets.on('connection', function (client) {
  client.resources = {
    screen: false,
    video: true,
    audio: false
  };

    // pass a message to another id
  client.on('message', function (details) {
    var otherClient = io.sockets.sockets[details.to];
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

  function removeFeed(type) {
    io.sockets.in(client.room).emit('remove', {
      id: client.id,
      type: type
    });
  }

  function join(name, cb) {
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
  }

  // we don't want to pass "leave" directly because the
  // event type string of "socket end" gets passed too.
  client.on('disconnect', function () {
    removeFeed();
  });
  client.on('leave', removeFeed);

  client.on('create', function (name, cb) {
    if (arguments.length === 2) {
      cb = (typeof cb === 'function') ? cb : function () {};
      name = name || uuid();
    } else {
      cb = name;
      name = uuid();
    }
    // check if exists
    if (io.sockets.clients(name).length) {
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
  var chatrooms = [{name: 'the eden', userCount: 1}, {name: 'the water cooler', userCount: 0}];
  res.json(chatrooms);
});

app.get('/rooms/:roomId', function(req, res){
  console.log('FRED: rooms ', req.params.roomId);
  var body = 'Hello World';
  res.send(body);
});
app.listen(config.server.rest.port);

console.log(' -- signal master is running at: http://localhost:' + config.server.socket.port);
console.log(' -- REST API is running at: http://localhost:' + config.server.rest.port);
