'use strict';

angular.module('seeApp')
  .factory('Chatrooms', ['$resource', function ($resource) {
    var WebSocketServerAddr = 'ws://0.0.0.0:8001';
    var Rooms = $resource('http://0.0.0.0\\:8002/rooms/:roomId');

    var _id = 1;
    var callbacks = {};
    var filters = {
      'rooms_list': function (data) { return data.chatrooms; },
      'room_created': function(data) { return data.name; }
    };
    var socket = new WebSocket(WebSocketServerAddr);

    socket.onopen = function() {
      console.log('Websocket opened');
    };

    socket.onmessage = function(e) {
      var dataJSON = JSON.parse(e.data);
      var eventName = dataJSON.eventName;
      var data = dataJSON.data;
      callbacks[data.id](filters[eventName](data));
      delete callbacks[data.id];
    };

    var requestList = function(cb) {
      _id += 1;
      callbacks[_id] = cb;

      socket.send(JSON.stringify({
        'eventName': 'get_rooms_list',
        'data': {'id': _id}
      }));
    };

    var createRoom = function(name, cb) {
      _id += 1;
      callbacks[_id] = cb;

      socket.send(JSON.stringify({
        'eventName': 'create_room',
        'data': {'id': _id, 'name': name}
      }));
    };

    var protect = function(f) {
      var splice = Array.prototype.splice;
      var args = arguments;

      if (socket.readyState === 0) {
        socket.onopen = function() {
          var a = splice.call(args, 1);
          f.apply(this, a );
        };
      } else {
        f.apply(this, splice.call(args, 1));
      }
    };

    // Public API here
    return {
      getChatrooms: function () {
        var chatrooms = Rooms.get();
        return chatrooms;
      },

      createChatroom: function(name, cb) {
        // protect( createRoom, name, cb);
        Rooms.save(name, cb);
      }
    };
  }]);
