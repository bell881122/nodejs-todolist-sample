const http = require('http');

const request = (res, status, content) => {
    // CORS Header
    res.writeHead(status, {
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PATCH, POST, GET, OPTIONS, DELETE',
        'Content-Type': 'application/json'
    });
    if (content)
        res.write(content);
    res.end();
}

const requestListener = (req, res) => {

    //註冊事件取得 body
    let body = "";
    req.on("data", chunk => {
        body += chunk;
    });
    req.on("end", () => {
        console.log(body)
    });

    //判斷 req 類型
    if (req.url === "/todos" && req.method === "GET") {
        request(res, 200, JSON.stringify({
            status: "success",
            data: []
        }))
    } else if (req.url === "/todos" && req.method === "POST") {
        request(res, 200, JSON.stringify({
            status: "success",
            data: "POST 成功"
        }))
    } else if (req.method === "OPTIONS") {
        request(res, 200);
    }
    else {
        request(res, 404, JSON.stringify({
            status: "failed",
            message: "無此路由"
        }))
    }
}

const server = http.createServer(requestListener);
server.listen(1111);