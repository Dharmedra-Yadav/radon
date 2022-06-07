const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema( {

    bookName:{
        type:String,
        require:true
    },
    price:{
       indianPrice:String,
       europenPrice:String
    },
    year :{
        type:Date,
        default:"2021"
    },
    tags:[String],
    authorName:{
        type:String
    },
    totalPages:Number,
    stockAvailable:Boolean
},{ timestamps: true });

module.exports = mongoose.model('BookDetails',bookSchema)


