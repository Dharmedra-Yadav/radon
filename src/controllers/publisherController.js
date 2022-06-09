const publisherModel=require("../models/publishedModel")

/******************************Method Declaration************************************/
const createPublisher= async function (req, res) {
    let publisher = req.body
    let publisherCreated = await publisherModel.create(publisher)
    res.send({data: publisherCreated})
}
/******************************Data Insert This Method**********************************/
const getPublisherData=async function(req,res){
    let publisherData=await publisherModel.find()
    res.send({data:publisherData})

}
/******************************Public Declaration This lines*****************************/
module.exports.createPublisher=createPublisher
module.exports.getPublisherData=getPublisherData
