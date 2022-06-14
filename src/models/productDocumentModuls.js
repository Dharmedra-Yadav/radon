const mongoose=require('mongoose')
const productDocumentSchema=new mongoose.Schema({
    name:String,
	category:String,
	price:{
        type:Number,
        required:true,
        default:100
    } 
},{ timestamps: true })
module.exports = mongoose.model('ProductDocument',productDocumentSchema)