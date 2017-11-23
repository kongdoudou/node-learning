/*
* 统计每位客户端访问服务器的次数
* 当这个客户端第一次访问服务器的时候，服务器返回，欢迎你的第一次访问
*/
let http = require('http');
let querystring = require('querystring');

let server = http.createServer(function(req,res){
    let url = req.url;
    if(url === '/visit'){
        //先取得请求头中的cookie字段，然后把cookie字段转换为对象，提取cookie对象中的visitNum对象，如果有值，表示服务器向客户端写过此cookie
        let visit = querystring.parse(req.headers.cookie,"; ").visitNum||0;
        visit++;
        //通过Set-Cookie设置响应头给客户端
        res.setHeader('Set-Cookie','visitNum='+visit);
        res.setHeader('content-type','text/plain;charset=utf8');
        res.end("欢迎您的第"+visit+"次访问");
    }
});

server.listen(8080);