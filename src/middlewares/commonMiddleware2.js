const checkHeader = async ( req, res, next) => {
    let header = req.headers['isfreeuser'];
    console.log(header)
   if(!(header == "true" || header == "false"))
    return res.send({msg:"request is missing a mandatory header"})
    next()
};
module.exports.checkHeader = checkHeader