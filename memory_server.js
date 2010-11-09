var sys = require("sys"),
    http = require("http"),
    url = require("url"),
    querystring=require("querystring");

var Memory = function() {
  this.clear();
};
Memory.prototype = {
  get: function() { return this._value;},
  add: function(value) { this._value = (this._value||0) + parseFloat(value); return this._value; },
  subtract: function(value) { this._value = (this._value||0) - parseFloat(value); return this._value; },
  clear: function() { this._value = null; return this._value; }
};
var memory = new Memory;

http.createServer(function(request, response) {
  var parsedUrl = url.parse(request.url),
      uri = parsedUrl.pathname,
      jsonp = querystring.parse(parsedUrl.query).callback,
      sendJSON = function(value) {
        var string = JSON.stringify(value);
        response.writeHead(200, { "Content-Type" : jsonp ? "text/javascript" : "application/json" });
        response.end(jsonp ? jsonp+"("+string+")" : string + "\n");
        sys.puts(request.method+" "+request.url+" => "+string);
      },
      route = uri.split("/").slice(1);

  if (request.method === "GET" && route[0] == "memory") {
    if (!route[1]) {
      sendJSON(memory.get());
      return;
    } else if (route[1] == "add" && route[2]) {
      sendJSON(memory.add(route[2]));
      return;
    } else if (route[1] == "subtract" && route[2]) {
      sendJSON(memory.subtract(route[2]));
      return;
    } else if (route[1] == "clear") {
      sendJSON(memory.clear());
      return;
    }
  }
  response.writeHead(404, {"Content-Type": "text/plain"});
  response.end("404 Not Found\n");
  sys.puts(request.method+" "+uri+" => 404 Not Found");
  return;
}).listen(8080);

sys.puts("Server running at http://localhost:8080/");
