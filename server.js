const http = require('http');
const { v4: uuidv4 } = require('uuid');
const todos = [];

const requestListener = (req, res) => {

    const request = (status, content) => {
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

    const errorRes = () => {
        request(400, JSON.stringify({
            status: "failed",
            message: "欄位未填寫正確，或無此 id"
        }))
    }

    const succRes = () => {
        request(200, JSON.stringify({
            status: "success",
            data: todos
        }))
    }

    //註冊事件取得 body
    let body = "";
    req.on("data", chunk => {
        body += chunk;
    });

    //判斷 req 類型
    if (req.url === "/todos" && req.method === "GET") {
        request(200, JSON.stringify({
            status: "success",
            data: todos
        }))
    } else if (req.url === "/todos" && req.method === "POST") {
        req.on("end", () => {
            try {
                const title = JSON.parse(body).title;
                if (title) {
                    todos.push({
                        title,
                        id: uuidv4()
                    })
                    succRes();
                } else {
                    errorRes();
                }
            } catch (err) {
                errorRes();
            }
        });
    } else if (req.url === "/todos" && req.method === "DELETE") {
        todos.length = 0
        succRes();
    } else if (req.url.startsWith("/todos/") && req.method === "DELETE") {
        try {
            const id = req.url.split("/").pop();
            const index = todos.findIndex(e => e.id === id);
            if (index > -1) {
                todos.splice(index, 1);
                succRes();
            }
            else {
                errorRes();
            }
        } catch (err) {
            errorRes();
        }
    } else if (req.url.startsWith("/todos/") && req.method === "PATCH") {
        req.on('end', () => {
            try {
                const id = req.url.split("/").pop();
                const index = todos.findIndex(e => e.id === id);
                const title = JSON.parse(body).title;
                if (title && index > -1) {
                    todos[index].title = title;
                    succRes();
                } else {
                    errorRes();
                }
            } catch (err) {
                errorRes();
            }
        })
    } else if (req.method === "OPTIONS") {
        request(200);
    }
    else {
        request(404, JSON.stringify({
            status: "failed",
            message: "無此路由"
        }))
    }
}

const server = http.createServer(requestListener);
server.listen(1111);