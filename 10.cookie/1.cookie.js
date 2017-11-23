let http = require('http');
let querystring = require('querystring');
let server = http.createServer(function(req,res){
    let url = req.url;
    if(url === '/write'){
        //当url地址是/write的时候，就需要写cookie
        //第一次客户端访问服务器的时候，服务器通过响应头向客户端种植cookie
        //分两次传入cookie，第一次写入name，第二次写入age，为了测试
        res.setHeader('Set-Cookie','name=kong'); //单个写入方式
        res.setHeader('Set-Cookie',['name=kong','age=29']);  //多个的写入方式
        res.end("write ok");
    }else if(url==='/read'){
        //当第二次我们的客户端访问服务器的时候，客户端会把本机上次保存的cookie带回给服务器，放在请求头
        //req.headers是一个对象，这个对象是从请求头中解析来的，{host:"http://localhost:8080"}
        let cookie = req.headers.cookie;
        console.log(cookie);  //name=kong; age=29
        //解析cookie格式的时候只能用querystring模块，不能用qs模块
        let cookieObj = querystring.parse(cookie,"; ");
        console.log(cookieObj);   //{ name: 'kong', ' age': '29' }
        res.end("age:"+cookieObj.age);
    }else{
        res.end("404");
    }
});
server.listen(8080);