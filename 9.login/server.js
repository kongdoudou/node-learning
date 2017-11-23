let express = require("express");
let app = express();
let path = require('path');

//body-parser:请求体解析器
let bodyParser = require('body-parser');

//user是个变量，它的值指向的是模块的导出对象 module.exports
let user = require('./routes/user');
/*
 * 需求：注册登录案例（如图）
 */

//设置模板的类型，它可以决定添加的模板后缀
app.set('view engine','html');
//设置模板存放的根路径
app.set('views',path.resolve('views'));
//用来指定某种模板的渲染方法
app.engine('html',require('ejs').__express);

//指定静态资源文件的存放地址,静态文件：不会动态改变的文件（html,js,img,图标，图片等）
//sendFile 发送文件，把一个路径里面的文件读出来返回给客户端，注意路径必须是绝对路径
//使用一个静态文件中间件，参数是一个静态文件根目录
//当服务器收到客户端的请求之后，会拼出一个绝对路径，找到这个静态文件
//先得到静态资源文件存放的根目录+路径名
app.use(express.static(path.resolve('../node_modules')));

//body-parser：使用中间件来解析请求体，并把请求体的内容转成对象并挂载在req.body上
//基本上所有的中间件都是一个函数，都需要执行
//此中间件可以解析编码后的url请求体，把请求体转成对象
app.use(bodyParser.urlencoded({extended:true}));

//如果请求的路径是以/user开头的话，会交由user中间件来匹配子路由
app.use('/user',user);

app.get('/',function(req,res){
    res.render('home');
});

app.listen(8080);