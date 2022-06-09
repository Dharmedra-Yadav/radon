const mongoose = require('mongoose');


/****************************Create Publisher Schema********************************/
const newPublisher= new mongoose.Schema( {
    publisher_name: String,
    headQuarter:String,
    
}, { timestamps: true });

module.exports = mongoose.model('Publisher',newPublisher)