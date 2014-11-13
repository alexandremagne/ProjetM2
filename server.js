/* 
SERVER TOURNE SUR LE PORT 5000
*/

var http = require("http");
var util = require("util");

var server = {}; //Server object. This object is use to stock everything owned by the server.
server.r = require("./router.js");
server.port = (process.env.PORT || 5000);
server.address = "0.0.0.0";
/**
* This method is called each times a request arrives on the server * @param req (Object) request object for this request
* @param resp (Object) response object for this request
*/
server.receive_request = function (req, resp) {
	server.r.router(req, resp);
};
http.createServer(server.receive_request).listen(server.port , "0.0.0.0");
util.log("INFO - Server started, listening " + server.address + ":" + server.port);
