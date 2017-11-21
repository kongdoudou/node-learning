/*
* 编写一个请求日志中间件
* 不管客户端访问什么路径，都在控制台打印出方法名和路径
*/

let express = require("express");
let app = express();

let http = require("http");
/*
* 中间件的作用
* 1、编写一些公用的逻辑，所有的路由都需要处理的话只需要在中间件里面写一次就够了
* 2、添加一些公用的属性和方法
*   公用属性：req.path req.query
*   公用方法：send
*/

app.use(function(req,res,next){
    res.setHeader("Content-type","text/html;charset=utf-8");
    next();
});
/*
* send方法用来向客户端（浏览器）发送响应体
* end只能接收字符串和buffer
* send可以接收任意类型 字符串 对象 数字 数组 buffer
* send也是通过中间件给res对象添加上去的
*
* send和end一样都会结束写入响应体，一旦调用之后则不能再次调用write或者end方法了，其实在send方法里面会调用end方法
* */

let STATUS_CODE = http.STATUS_CODES;//状态码信息列表

//为响应对象添加send方法
app.use(function(req,res,next){
    //不管传递过来的是什么类型的数据，都转成字符串，然后调用end方法
    res.mySend = function(params){
        console.log(params);
        //先取得参数的类型
        let type = typeof params;
        //对象 数组 数字（当成状态码来使用）
        switch(type){
            case 'object':{
                //如果参数的类型是对象的话，需要先转成字符串
                params = JSON.stringify(params);
                break;
            }
            case 'number':{
                //如果参数的类型是数字的话，设置响应的状态码为这个数字
                res.statusCode = params;
                //然后再找到状态码对应的描述信息给params
                params = STATUS_CODE[params];
                break;
            }
            default:{
                //如果是字符串和buffer就什么都不做
                params = params.toString();
            }
        }
        res.end(params);
    };
    next();
});


app.get("/",function(req,res){
    res.mySend([1,2,3]);
});

app.use(function(req,res,next){
    //如果设置两个相同的key，后面的会覆盖前面的key
    //在调用setHeader的时候响应头并没有发送，响应头会在第一次调用write的时候发送
    res.setHeader("Content-type","text/plain;charset=utf-8");
    next();
});

app.get("/user",function(req,res){
    res.mySend({name:"kong",age:29});
});
app.listen(8080);