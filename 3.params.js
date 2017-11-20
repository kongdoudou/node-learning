/*
* 如何在服务器中获取请求中的参数
* 请求行 方法名 路径（用问号隔开的两部分，左边部分是路径名，右边是查询字符串）
* 请求头
*/

let express = require("express");
let url = require("url");
let app = express();

//req,res和原生HTTP服务器的请求和响应是同一个对象，只不过增加了一些额外的属性
app.get("/user",function(req,res){
    let method = req.method;
    //pathname="/user";query={ id: '0', name: 'kong' }
    let {pathname,query} = url.parse(req.url,true);
    console.log("method:"+method);
    console.log("pathname:"+pathname); //问号前面的路径名
    console.log("query:"+JSON.stringify(query)); //问号后面的查询字符串对象
    console.log(req.headers);  //获取请求头，headers是原生的属性,是一个对象

    console.log("pathname:"+req.path); //express中获取pathname的方法
    console.log("query:"+JSON.stringify(req.query));  //express中获取查询字符串的方法

    res.end("OK");
});

//路径参数
// "/user/2"
let users = [{id:1,name:"kong1"},{id:2,name:"kong2"},{id:3,name:"kong3"}];
app.get('/user/:id',function(req,res){
    console.log(req.params); //=> { id: '2' }
    //先拿到路径参数里面的ID
    let id = req.params.id;  //获取的ID是一个字符串,"2"
    let curUser = users.find(function(item){
        return item.id == id;
    });
    res.end(curUser.name);
});

app.listen(8000);