let http = require("http");

//创建一个HTTP服务器，参数是一个请求监听函数，当服务器收到客户端的请求的时候会执行此监听函数
//req：请求对象；res:响应对象
//乱码的原因是编辑器的编码（utf-8）和浏览器的默认编码（GBK）不一样


//1、业务全部放在一个函数内部，会导致此函数过于庞大
//2、以后重构起来的风险比较大，可能会影响到别的路由
let server = http.createServer(function(req,res){
    //获取本次请求的方法
    let method = req.method;
    //获取本地请求的路径
    let url = req.url;
    //告诉客户端浏览器我的内容类型是html格式的，文件编码是utf-8
    res.setHeader("Content-Type","text/html;charset=utf-8");
    //当请求的方式是“GET”并且请求路径是“/signup”的时候
    if(method==='GET'&&url==='/signup'){
        //写入响应体并且结束响应
        res.end("注册");
    }else if(method==='GET'&&url==='/signin'){
        //写入响应体并且结束响应
        res.end("登录");
    }else{
        res.end('页面未找到');
    }
});

server.listen(8000,function(){
    console.log("server is running at 192.168.11.129:8000");
});