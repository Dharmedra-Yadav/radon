const mongoose = require('mongoose');

/************************************Create Author Schema*********************************/
const newAuthor= new mongoose.Schema( {
    author_name:String,
    age:Number,
    address:String,
    rating:Number

}, { timestamps: true });

module.exports = mongoose.model('Author',newAuthor)
