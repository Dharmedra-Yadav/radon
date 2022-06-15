const jwt=require('jsonwebtoken')
const authenticate = function(req, req, next) {
    //check the token in request header
    //validate this token
    let token=req.headers['x-Auth-token']
    if(!token) token=req.headers['x-auth-token']
    if(!token) return res.send({status:false,msg:"Token Must Be Present"})
    let decodedToken=jwt.verify(token,'functionup-thorium')
    if(!decodedToken) return res.send({status:false,msg:"Token Is Not Valid"})

    next()
}

/**********************This is Authorised Handling Area***************************/
const authorise = function(req, res, next) {
    // comapre the logged in user's id and the id in request
    let token=req.headers['x-Auth-token']
    if(!token) token=req.headers['x-auth-token']
    let decodedToken = jwt.verify(token, 'functionup-thorium')
    //userId for which the request is made.In this case message to be posted
    let userToBeModified=req.params.userId

    //userId for the logged in user
    let userLoggedIn=decodedToken.userId

    //userId Comparision to check if the logged in user is requesting for their own data.
    if(userToBeModified !=userLoggedIn) return res.send({status:false,msg:"You Are Not Authorised Login First"})

    next()
}
module.exports.authenticate=authenticate
module.exports.authorise=authorise