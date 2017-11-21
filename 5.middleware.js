/*
* 编写一个请求日志中间件
* 不管客户端访问什么路径，都在控制台打印出方法名和路径
*/

let express = require("express");
let app = express();
/*
* 中间件的作用
* 1、编写一些公用的逻辑，所有的路由都需要处理的话只需要在中间件里面写一次就够了
*
*/

app.use(function(req,res,next){
    console.log("method:",req.method);
    console.log("path:",req.path);
    next();
});
app.use(function(req,res,next){
    res.setHeader("Content-type","text/html;charset=utf-8");
    next();
});

app.get("/",function(req,res){
    res.end("首页");
});
app.get("/user",function(req,res){
    res.end("用户");
});
app.listen(8080);