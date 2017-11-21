//分类相关的路由放在这里
/*
* /category/add 增加分类
* /category/delete 删除分类
* */
let express = require("express");
let router = express.Router();

/*
 * 三级路由的方式
 * let app = express();
 * let third = require('./third');
 * router.use('/third',third);
 */

//router其实是一个中间件函数
router.get("/add",function(req,res){
    res.send("增加分类");
});

router.get("/delete",function(req,res){
    res.send("删除分类");
});

module.exports = router;