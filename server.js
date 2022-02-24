const http = require('http');
const { v4: uuidv4 } = require('uuid');
const { request, succRes, errorRes } = require('./request');
const todos = [];

const requestListener = (req, res) => {

    //註冊事件取得 body
    let body = "";
    req.on("data", chunk => {
        body += chunk;
    });

    //判斷 req 類型
    if (req.url === "/todos" && req.method === "GET") {
        succRes(res, todos);
    } else if (req.url === "/todos" && req.method === "POST") {
        req.on("end", () => {
            try {
                const title = JSON.parse(body).title;
                if (title) {
                    todos.push({
                        title,
                        id: uuidv4()
                    })
                    succRes(res, todos);
                } else {
                    errorRes(res);
                }
            } catch (err) {
                errorRes(res);
            }
        });
    } else if (req.url === "/todos" && req.method === "DELETE") {
        todos.length = 0
        succRes(res, todos);
    } else if (req.url.startsWith("/todos/") && req.method === "DELETE") {
        try {
            const id = req.url.split("/").pop();
            const index = todos.findIndex(e => e.id === id);
            if (index > -1) {
                todos.splice(index, 1);
                succRes(res, todos);
            }
            else {
                errorRes(res);
            }
        } catch (err) {
            errorRes(res);
        }
    } else if (req.url.startsWith("/todos/") && req.method === "PATCH") {
        req.on('end', () => {
            try {
                const id = req.url.split("/").pop();
                const index = todos.findIndex(e => e.id === id);
                const title = JSON.parse(body).title;
                if (title && index > -1) {
                    todos[index].title = title;
                    succRes(res, todos);
                } else {
                    errorRes(res);
                }
            } catch (err) {
                errorRes(res);
            }
        })
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
server.listen(process.env.PORT || 1111);