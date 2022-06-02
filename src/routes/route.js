
const express = require('express');
const _=require('lodash');
const routs=require('../util/helper.js')
const format=require('../validator/formatter')
const router = express.Router();
const logger=require('../logger/logger')
// const underscore=require('underscore')
//router.get('/test-me', function (req, res) {
 /* logger.welcome()
  routs.printDate()
  routs.printMonth()
  routs.getBatchInfo()
  format.trim()
  format.changetoLowerCase()
  format.changeToUpperCase()

let firstArray=underscore.first(["Dkyadav","Shilpi","Muskan"]);
console.log("The First Elements of Receive an Array:-",firstArray)

    res.send('My first ever api!')
}); */

router.get('/test-me1', function (req, res) {
    res.send('My second ever api!')
});

router.get('/test-me2', function (req, res) {
    res.send('My third api!')
});

router.get('/test-me3', function (req, res) {
    res.send('My 4th api!')
});

router.get('/test-me4', function (req, res) {
    res.send('My last api!')
});
//

router.get('/hello',function(req,res){
    //using lodash function
    let _ = require("lodash")
    const year=['january','feburary','march','april','may','june','july',
    'august','september','july','august','september','october','november','december']
     console.log("After:",_.chunk(year,3))

     //using tail function
     let array = [1,3,5,7,9,11,13,15,17,19]
     let newArray = _.tail(array);
     console.log(newArray)

     //using union function
    let arr = _.union([1,2],[3,4],[5,6],[7,8],[9,10,11])
    console.log(arr)

    //using fromPairs function
    const movies = [
        ["horror" , "The shining"],
        ["drama", "Titanic"],
        ["Thriller", "Shutter Island"],
        ["Fantasy" , "Pans Labyrinth"]
    ]
    let pairs = _.fromPairs(movies);
    console.log(movies);

     res.send('My first Hello api & Lodash Package Using!')
});



/*//Pritesh Kumar Assignment in CW
router.get("/sol1", function (req, res) {
    //logic : sum of numbers is n(n+1)/2..so get sum of all numbers in array. now take sum of numbers till last digit in the array
    let arr= [1,2,3,5,6,7]
    let missingNumber
    //LOGIC WILL GO HERE 
    let n=arr[arr.length-1]
    let sum=0
    arr.forEach(x=>{
        sum+=x;
    })
     missingNumber=(n*(n+1)/2)-sum
    res.send(  { data: missingNumber  }  );
});

router.get("/sol2", function (req, res) {
    //logic : sum of n consecutive numbers is [ n * (first + last) / 2  ]..so get sum of all numbers in array. now take sum of n consecutive numbers.. n would be length+1 as 1 number is missing
    let arr= [33, 34, 35, 37, 38]
    let n=arr.length+1
    let first=arr[0]
    let last=arr[arr.length-1]
    let sum=0
    arr.forEach(x=>{
        sum+=x;
    })
    let missingNumber=(n*(first+last)/2)-sum
    
    res.send(  { data: missingNumber  }  );
});
*/



module.exports= router;

// adding this comment for no reason