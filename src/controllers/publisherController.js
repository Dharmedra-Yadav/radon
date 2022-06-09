const publisherModel=require("../models/publishedModel")

const createPublisher= async function (req, res) {
    let publisher = req.body
    let publisherCreated = await publisherModel.create(publisher)
    res.send({data: publisherCreated})
}
const getPublisherData=async function(req,res){
    let publisherData=await publisherModel.find()
    res.send({data:publisherData})

}
module.exports.createPublisher=createPublisher
module.exports.getPublisherData=getPublisherData
 