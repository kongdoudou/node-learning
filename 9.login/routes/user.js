let express = require("express");
//返回一个路由中间件
let router = express.Router();
let bodyParser = require('body-parser');
//定义一个数组，保存所有的用户
let users = [];

//注册的跳转
router.get('/signup',function(req,res){
    //render的第一个参数是模板的相对路径，相对于模板的根路径
    res.render('signup');
});
//登录的跳转
router.get('/signin',function(re,res){
    res.render('signin');
});
router.post('/signup',function(req,res){
    //注册的时候需要检验用户是否已经存在，如果已经存在了注册失败并返回注册表单重新填写注册表单，如果不存在则注册成功存储在数组中并跳转到登录页面
    let user = req.body;
    let oldUser = users.find(item=>item.username==user.username);
    if(oldUser){
        //back是表示返回上一个页面，从哪里来回哪里去
        res.redirect('back');
    }else{
        // 用户不存在的时候，将用户添加到用户列表中
        //向用户数组中添加新的用户
        users.push(user);
        //注册成功之后，重定向到登录页，这里的路径要写全，必须以/开头，所有的路径都必须以/开头
        res.redirect('/user/signin');
    }
});

router.post('/signin',function(req,res){
    //因为我们已经引用过了bodyParser中间件，所以请求对象上有body属性，req.body
    let user = req.body;
    //在老的用户数组中查找有没有跟本次提交过来的用户名和密码都匹配的用户，如果有则认为登录成功，跳到首页，如果没有，则认为登录失败，跳回登录页
    let oldUser = users.find(function(item){
                return item.username == user.username && item.password == user.password
        });
    if(oldUser){
        //用户存在，跳转到首页
        res.redirect('/');
    }else{
        //用户不存在，返回上一个页面
        res.redirect('back');
    }
});

module.exports = router;