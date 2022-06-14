const mongoose=require('mongoose')
const objectId=mongoose.Schema.Types.ObjectId
const orderDocumentSchema=new mongoose.Schema({
    amount:Number,
    userId:{
        type:objectId,
        ref:'UserDocument'
    },
	productId:{
        type:objectId,
        ref:'ProductDocument'
    },
	isFreeAppUser:Boolean, 
	date:String
},{ timestamps: true })
module.exports = mongoose.model('OrderDocument',orderDocumentSchema)