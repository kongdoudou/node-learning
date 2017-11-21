let express = require("express");
let app = express();

//用户 路由中间件
let user = require('./routes/user');
//分类 路由中间件
let category = require('./routes/category');

/*
* 现在use里面传入了两个参数，第一个参数是路径前缀，第二个参数才是路由中间件
* 当客户端请求url地址/user/signup的话，也就是说是以/user开头的话，才会走user中间件
* 当客户端请求url地址/category/id的话，也就是说是以/category开头的话，才会走category中间件
* */
app.use('/user',user);
app.use('/category',category);

//端口号的取值范围是0~65535
app.listen(8080);