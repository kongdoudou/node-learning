let obj = {
    name:"kong",
    address:{
        city:"beijing"
    }
};

/*
* app.use(bodyParser.urlencoded({extended:true}));
* 当extended为false的时候表示使用querystring模块进行解析
* 当extended为true的时候表示使用qs模块进行解析
*/

//querystring是node原生自带的模块，涉及到例子中的对象解析的时候会出问题
let querystring = require("querystring");
console.log(querystring.stringify(obj)); //name=kong&address=
console.log(querystring.parse(querystring.stringify(obj))); //{ name: 'kong', address: '' }

//qs是express中的模块，功能更加完善
let qs = require("qs");
console.log(qs.stringify(obj)); //name=kong&address%5Bcity%5D=beijing
console.log(qs.parse(qs.stringify(obj))); //{ name: 'kong', address: { city: 'beijing' } }