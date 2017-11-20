let express = require("express");
//express是一个方法，或者说是一个函数，执行此函数可以得到app
//app本质上一个请求监听函数，会在客户端提交请求到服务器的时候执行
let app = express();

//如何定义路由？
//app的方法名和HTTP请求的方法名是一一对应的
//GET POST PUT DELETE HEAD OPTIONS TRACE CONNECT，一共八种
//第一个参数是请求URL，第二个参数是请求监听函数
//路由只要能匹配一个，就不会向下匹配了，所以一定要注意路由的书写顺序，例如，all不能写在最前面
app.get('/signup',function(req,res){
    res.setHeader("Content-type","text/html;charset=utf-8");
    res.end("注册");
});

//所有的路径都是以“/”开头的
app.get('/signin',function(req,res){
    res.setHeader("Content-type","text/html;charset=utf-8");
    res.end("登录");
});

//all代表能匹配所有的方法，*代表能匹配所有的路径
app.all("*",function(req,res){
    res.setHeader("Content-type","text/html;charset=utf-8");
    res.end("访问的页面不存在");
});

//如果没有写all方法，那么如果没有任何一个路由能匹配的话，则会返回404，并且返回响应体 “Cannot GET 路径名”

//监听8080端口，启动一个HTTP服务器
app.listen(8080);