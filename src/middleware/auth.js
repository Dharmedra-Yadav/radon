const jwt=require('jsonwebtoken')
const authenticate = function(req, req, next) {
    //check the token in request header
    //validate this token
    try{
        let token=req.headers['x-Auth-token']
        if(!token) token=req.headers['x-auth-token']
        if(!token) return res.status(424),send({status:false,msg:"Token Must Be Present"})
        let decodedToken=jwt.verify(token,'functionup-thorium')
        if(!decodedToken) return res.status(400),send({status:false,msg:"Token Is Not Valid"})
    }catch(error){
       console.log(error)
       res.send({msg:error})
    }
    next()
}

/**********************This is Authorised Handling Area***************************/
const authorise = function(req, res, next) {
    // comapre the logged in user's id and the id in request
    try{
        let token=req.headers['x-Auth-token']
        if(!token) token=req.headers['x-auth-token']
        let decodedToken = jwt.verify(token, 'functionup-thorium')
        //userId for which the request is made.In this case message to be posted
        let userToBeModified=req.params.userId

        //userId for the logged in user
        let userLoggedIn=decodedToken.userId

        //userId Comparision to check if the logged in user is requesting for their own data.
        if(userToBeModified !=userLoggedIn) return res.send({status:false,msg:"You Are Not Authorised Login First"})
    }catch(error){
        console.log("Error:-",error)
        res.status(404),send({msg:error})
    }
    next()
}
/*****************This is Public Lines****************************/
module.exports.authenticate=authenticate
module.exports.authorise=authorise