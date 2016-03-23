module.exports = {
	user:{
		name: {type:String, required:true},
		password: {type:String, required:true},
	},
    // 商品名称、商品价格、商品图片
	commodity:{
        name: {type:String},
        price: {type:Number},
        img: {type:String}
    },
    cart:{
        uId: { type: String },//用户ID
        cId: { type: String },//商品ID
        cName: { type: String },//商品名称
        cPrice: { type: String },//商品价格
        cImg: { type:String } ,//商品展示图片路径
        cQuantity: { type: Number },//商品数量
        cStatus : { type: Boolean, default: false  }//商品结算状态，默认为false
    }
};