module.exports = function(app){
	app.get('/login', function(req, res){
		res.render('login');
	});
	app.post('/login', function (req, res){
		var User = global.dbHelper.getModel('user'),
         uname = req.body.uname;
		User.findOne({name:uname}, function (error, doc){
			if (error) {
               res.sendStatus(500);
                req.session.error = '网络异常错误！';
                console.log(error);
                console.log(req.session.error);
            } else if (!doc) {
                req.session.error = '用户名不存在！';
               res.sendStatus(404);
               console.log(req.session.error);
            } else {
                if(req.body.upwd != doc.password){
                	req.session.error = '密码错误！';
                	res.sendStatus(404);
                	console.log(req.session.error);
                }else{
                	req.session.user=doc;
                	res.sendStatus(200);
                	console.log(req.session.user+'login.js');
                }
            }
		});
	});
}