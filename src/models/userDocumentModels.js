const mongoose=require('mongoose')
const userDocumentSchema=new mongoose.Schema({
    name:String,
    balace:Number,
    address:String,
    age:Number,
    gender:{
        type:String,
        enum:['male','female','others'],
        default:'famale'
    },
    isFreeAppUser:{
        type:Boolean,
        default:false
    }
},{ timestamps: true})
module.exports = mongoose.model('UserDocument',userDocumentSchema)

