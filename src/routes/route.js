const express = require('express');
const routs=require('../util/helper.js')
const format=require('../validator/formatter')
const router = express.Router();
const logger=require('../logger/logger')

router.get('/test-me', function (req, res) {
  logger.welcome();
//   console.log(routs.printDate())
  routs.printDate()
  routs.printMonth()
  routs.getBatchInfo()
//   console.log(routs.printMonth())
//   console.log(routs.getBatchInfo())
  console.log(format.trim())
  console.log(format.changetoLowerCase())
  console.log(format.changeToUpperCase())

    res.send('My first ever api!')
});

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

module.exports = router;
// adding this comment for no reason