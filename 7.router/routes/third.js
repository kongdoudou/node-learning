//用户相关的路由放在这里
//引入express模块
let express = require("express");
//通过执行Router方法得到路由中间件的实例
let router = express.Router();
//router的用法和APP有点像，是用来定义路由的
console.log("a");
//当客户端以get的请求方式访问/user/signup的时候，执行对应的函数
router.get("/signup",function(req,res){
    console.log(req);
    res.send("注册");
});
router.get("/signin",function(req,res){
    res.send("登录");
});

module.exports = router;