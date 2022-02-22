const http = require('http');

const requestListener = (req, res) => {
    console.log("req", req.method)
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write("Hello!");
    res.end();
}

const server = http.createServer(requestListener);
server.listen(1111);