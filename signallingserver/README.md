# See server

This is the backend of See. It allows browser to negociate video and audio communication, and updates them with some 
addiional information of what happens in the rooms (like the number of people, the removal or creation of a room, and so on).

This is basically a websocket server. The message exchanged over websocket are JSON messages with the following format:

```
{
	event: <name of the event>,
	data: <data associated to this event>
}
```

