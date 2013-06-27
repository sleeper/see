package main

import (
	"code.google.com/p/go.net/websocket"
	"flag"
	"fmt"
	// "github.com/oskarth/wsevents"
	"log"
	"net/http"
	"os"
	"bufio"
	// "text/template"
)

var addr = flag.String("addr", ":8080", "http service address")
// var homeTempl = template.Must(template.ParseFiles("index.html"))

func homeHandler(c http.ResponseWriter, req *http.Request) {
	// homeTempl.Execute(c, req.Host)
	fmt.Print("Serving index.html\n")
	var f, _ = os.Open("index.html")
	defer f.Close()
	var r = bufio.NewReader(f)
	fmt.Println(r)
	http.ServeFile(c, req, "index.html")
}

func resourceHandler(c http.ResponseWriter, req *http.Request) {
	fmt.Print("Serving "+req.URL.Path[1:], "\n")
	http.ServeFile(c, req, req.URL.Path[1:])
}

func main() {
	flag.Parse()

	// wsevents.Connect(func(c *wsevents.Connection) {

	// 	// wrap event with color before sending it
	// 	c.On("chat msg", func(msg interface{}) {
	// 		d := map[string]string{
	// 			"msg":   msg.(string),
	// 			"color": "#999",
	// 		}
	// 		c.Broadcast("chat msg", d)
	// 	})
	// })
	// go wsevents.Run()
	http.HandleFunc("/", homeHandler)
	// http.HandleFunc("/resources/webrtc.io.js", resourceHandler)
	http.HandleFunc("/jquery.min.js", resourceHandler)
	http.Handle("/ws", websocket.Handler(wsHandler))
	if err := http.ListenAndServe(*addr, nil); err != nil {
		log.Fatal("ListenAndServe:", err)
	}
}
