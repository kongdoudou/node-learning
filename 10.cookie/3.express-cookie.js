/*
* 如何在express中读写cookie
*/
let express = require("express");
let cookieParser = require("cookie-parser");
let app = express();
app.use(cookieParser());
app.get('/write',function(req,res){
    //cookie的方法是express为我们提供的，让我们更方便的写入cookie
    res.cookie('name','kong',{
        //这里domain的意思就是说此cookie归哪个域名所有，规定只有在向指定域名发起请求的时候才会发送这个cookie
        domain:"a.kong.cn",
        //规定此cookie是属于哪个路径的,只有客户端访问哪个路径的时候才会发送此cookie
        path:"/read1",
        //设置cookie的有效时间，只要到了指定的时间之后，此cookie会立刻被销毁,这里的时间是以客户端的时间为标准的相对时间
        expires:new Date(Date.now()+10*1000),
        //设置cookie的过期时间，有效时间(单位是毫秒)
        maxAge:10*1000
    });
    res.send('write OK');
});
app.get('/read1',function(req,res){
    //cookies就是req.headers.cookie转成的对象
    console.log(req.cookies);  //{ name: 'kong' }
    res.send(req.cookies);
});
app.get('/read2',function(req,res){
    //cookies就是req.headers.cookie转成的对象
    console.log(req.cookies);  //{ name: 'kong' }
    res.send(req.cookies);
});
app.listen(8080);