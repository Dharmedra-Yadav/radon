 const printDate=function(){
    let currentDate=new Date()
    console.log(currentDate)
}
const printMonth = function(){
    let currentDate=new Date()
    let currentMonth=currentDate.getMonth()+1
    console.log('The Current Month:-'+currentMonth)
    // console.log("June")
}
const getBatchInfo =function(){
    // console.log("Batch Name:-Radon")
    // console.log("Week:-03");
    // console.log("Day:-03");
    // console.log("Introduction to nodejs and some methods etc..")
    let getBatchInfo="Radon, W3D3, the topic for today is Nodejs module system’"
    console.log("Batch Info:-"+getBatchInfo)
}

module.exports.printDate=printDate
module.exports.printMonth=printMonth
module.exports.getBatchInfo=getBatchInfo