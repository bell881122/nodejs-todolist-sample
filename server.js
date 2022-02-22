const http = require('http');

const request = (status, content) => {
    res.writeHead(status, { "Content-Type": "text/html" });
    res.write(content);
    res.end();
}

const requestListener = (req, res) => {
    if (req.url === "/" && req.method === "GET") {
        request(200, "<h1>index</h1>")
    } else if (req.url === "/" && req.method === "DELETE") {
        request(200, "<h1>刪除成功</h1>")
    } else {
        request(404, "Not Found 404.")
    }
}

const server = http.createServer(requestListener);
server.listen(1111);