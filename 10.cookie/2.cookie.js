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
        //指定分隔符的时候一定要注意是“分号+空格”，一定要加空格；
        //querystring.parse中的第一个参数是要格式化的字符串，第二个参数是键值对的分隔符（; ）,第三个参数是key和value的分隔符（默认是等于号）
        console.log(querystring.parse(req.headers.cookie,"; ")); //{ name: 'kong', age: '29', visitNum: '3' }
        let visit = querystring.parse(req.headers.cookie,"; ").visitNum||0;
        visit++;
        //通过Set-Cookie设置响应头给客户端
        res.setHeader('Set-Cookie','visitNum='+visit);
        res.setHeader('content-type','text/plain;charset=utf8');
        res.end("欢迎您的第"+visit+"次访问");
    }
});

server.listen(8080);