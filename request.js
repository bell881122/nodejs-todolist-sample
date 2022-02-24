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

const succRes = (res, todos) => {
    request(res, 200, JSON.stringify({
        status: "success",
        data: todos
    }))
}

const errorRes = res => {
    request(res, 400, JSON.stringify({
        status: "failed",
        message: "欄位未填寫正確，或無此 id"
    }))
}

module.exports = { request, succRes, errorRes };