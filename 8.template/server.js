let express = require("express");
let app = express();
let path = require("path");

//1、设置模板引擎 ejs jade handlebar
app.set('view engine','html');
//2、设置模板的存放目录
//如果存放模板的文件夹名称叫做“views”,那么下面这句话可以不写；但是如果不叫views必须填写
//resolve:从当前路径出发，解析路径，返回的是绝对路径，相当于path.join(__dirname,"views");
app.set('views',path.resolve("views"));
//设置模板的渲染方法，当express发现模板的文件后缀是html的话，会使用ejs进行渲染
app.engine('html',require("ejs").__express);

app.get('/',function(req,res){
    /*r ender 渲染，绘制 express为请求对象res添加了一个render方法
     * 第一个参数放模板的相对路径（相对于view目录的），所以不要以/和‘./’开头
     * 第二个参数是数据对象，第三个参数是回调函数
     * 渲染就是把静态的模板和动态的数据混合生成HTML代码的过程
     */

    /*
    * 1、读取模板存放根目录下面index.ejs的文件内容
    * 2、用数据对象把模板中的内容替换掉
    * 3、把得到的HTML代码返回给客户端
    */
    //.就代表views路径，指的是模板的根目录，可以不写./
    res.render("./index",{title:"首页1"});
});
//路径只能写路径名；查询参数通过req.query获取
//路径参数通过req.params来获取
app.get("/user",function(req,res){
    res.render('user',req.query);
});

app.get("/add",function(req,res){
    //位于模板根目录的二级子路径下的ejs文件渲染
    res.render('user/add');
});

let users = [{id:1,name:"kong1"},{id:2,name:"kong2"},{id:3,name:"kong3"}];
app.get("/render",function(req,res){
    //模板渲染的部分,传递数据的部分必须是一个对象才可以，不能只写入数组
    res.render('render',{users});
});

app.listen(8080);