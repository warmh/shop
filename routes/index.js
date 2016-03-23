// 便于管理和访问，把路由记录统一放到一起，新建index.js文件专门用来存放添加的文件，
module.exports=function(app){
	require('./login')(app);
	require('./home')(app);
    require('./logout')(app);
    require('./register')(app);
    require('./cart')(app);
}