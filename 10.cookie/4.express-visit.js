let express = require("express");
let cookieParser = require("cookie-parser");
let app = express();
//使用此中间件以后会在req上增加一个cookies属性
app.use(cookieParser());

app.get('/visit',function(req,res){
    //取得cookie中的visit字段
    let visit = req.cookies.visit||0;
    visit++;
    res.cookie('visit',visit);
    res.send(`这是你的第${visit}次访问`);
});

app.listen(8080);