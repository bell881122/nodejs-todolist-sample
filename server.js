const http = require('http');

const request = (res, status, content) => {
    // CORS Header
    res.writeHead(status, {
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PATCH, POST, GET, OPTIONS, DELETE',
        'Content-Type': 'application/json'
    });
    res.write(content);
    res.end();
}

const requestListener = (req, res) => {
    if (req.url === "/" && req.method === "GET") {
        request(res, 200, JSON.stringify({
            status: "success",
            data: []
        }))
    } else {
        request(res, 404, JSON.stringify({
            status: "failed",
            message: "無此路由"
        }))
    }
}

const server = http.createServer(requestListener);
server.listen(1111);