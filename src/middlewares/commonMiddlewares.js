const timeStamp= function ( req, res, next) {
    console.log(new Date().toISOString());
   
    next()
}    
module.exports.timeStamp=timeStamp
