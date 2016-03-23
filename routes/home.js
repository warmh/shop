module.exports = function (app){
	app.get('/home', function(req, res){
		if(req.session.user){
			var Commodity = global.dbHelper.getModel('commodity');
            Commodity.find({}, function (error, docs) {
            	//将Commoditys变量传入home模板
                res.render('home',{Commoditys:docs});
            });
		}else{
			req.session.error = '请登录！';
			res.redirect('/login');
		}
	});
	app.get('/addcommodity', function (req, res){
		res.render('addcommodity');
	})
	app.post('/addcommodity', function (req, res){
		var Commodity = global.dbHelper.getModel('commodity');
		Commodity.create({
			name: req.body.name,
			price: req.body.price,
			img: req.body.img
		}, function (err, doc){
			if(doc){
				res.send(200);
				console.log('添加成功')
			}else{
				res.send(404);
				comsole.log('添加失败')
			}
		})
	})
}