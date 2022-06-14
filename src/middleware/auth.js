/***************Create Middleware Logic******************************/

const middAuth=function(req,res,next){
    let token=req.headers["x-Auth-token"];
    if(!token)token=req.headers["x-Auth-token"]
    if(!token) return res.send({ status:false,msg:'Token Most Be Required'})
    let decodedToken=jwt.verify(token,'functionup-radon')
    if(!decodedToken)
    return res.send({status:false,msg:'Invalid Token'}),
    next();
    else{
        next();
    }
}
module.exports.middAuth=middAuth