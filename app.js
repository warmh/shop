 /*模块依赖*/
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var session = require('express-session');
var path = require('path');
var mongoose = require("mongoose");
var ejs = require('ejs');
var partials = require('express-partials');
// express() 表示创建express应用程序。简单几行代码其实就可以创建一个应用，
var app = express();

/*环境变量 调用中间件使用 app.use() app.set()*/
global.dbHelper = require("./common/dbHelper.js");//把它定义为全局变量
//创建一个数据库连接
mongoose.connect("mongodb://127.0.0.1:27017/text1");
global.db = mongoose.connection;
// 判断是否连接成功
db.on("error", console.error.bind(console, 'connection error:'));
db.on("open", function () {
    console.log("------数据库连接成功！------");
});

/*app.use(session({
    secret:'secret',
    cookie:{
        maxAge:1000*60*30
    }
}));*/
 app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,//改为true,就获取不到session 了，why
    maxAge: new Date(Date.now() + 3600000)
  }
}));
/*app.get('/',function (reg, res){
	res.send('Hello World!')
});
app.listen(80);
就是在给定的主机和端口上监听请求，这个和node中http模块的http.createServer(function(){...}).listen()效果一致*/
 // ====================
app.engine('.html', ejs.__express );
app.set('view engine', 'ejs');

// app.set(name, value)和app.get(name)就是你想的那样，set()为设置 name 的值设为 value，get()为获取设置项 name 的值。

// app.engine()方法之前先看看express应用的安装命令:“express -e nodejs-product”，其中的 -e 和 -J 我们一开始已经提到，表示ejs和jade模板。
// 如果想把模板后缀改成“.html”时就会用到app.engine方法，来重新设置模板文件的扩展名，比如想用ejs模板引擎来处理“.html”后缀的文件：app.engine('.html', require('ejs').__express);
// app.use([path], function) 使用中间件 function,可选参数path默认为"/"。使用 app.use() “定义的”中间件的顺序非常重要，它们将会顺序执行，use的先后顺序决定了中间件的优先级
// app.render(view, [options], callback) 渲染 view, callback 用来处理返回的渲染后的字符串
// 设定变量，存放视图存放的目录
app.set('views', require('path').join(__dirname, 'views'));
// 在本地项目中，指定本地静态资源访问的路径,设置：
app.use(express.static(require('path').join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// app.use(multer());
// app.use(multer({ dest: './uploads/' }))

app.use(function(req, res, next){
    console.log(req.session.user+'home.js');
    res.locals.user = req.session.user;
    var err = req.session.error;
    res.locals.message = '';
    if (err) res.locals.message = '<div class="alert alert-danger" style="margin-bottom: 20px;color:red;">' + err + '</div>';
    console.log(res.locals.message+'home.js');
    next();
});
require('./routes')(app);

app.get('/',function (req, res){
	res.render('login');
});
app.listen(80);




