const axios = require("axios");
let getSortCities = async function (req, res) {
  try {
    let cities = [
      "Bengaluru",
      "Mumbai",
      "Delhi",
      "Chennai",
      "London",
      "Mascow",
    ]; //create City List
    let cityObjArray = []; //create Empty array
    for (let i = 0; i < cities.length; i++) {
      let obj = { city: cities[i] };
      let resp = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=city${cities[i]}&appid=be80bd4274c4b38e49c3443aee325923`
      );
      console.log(resp.data.main.temp);
      obj.temp = resp.data.main.temp;
      cityObjArray.push(obj);
    }
    let sorted = cityObjArray.sort(function (a, b) {
      return a.temp - b - temp;
    });

    console.log(sorted);
    res.status(200).send({ status: true, data: sorted });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: false, msg: "server Error" });
  }
};

/***************************It's public ***********************************/
module.exports.getSortCities = getSortCities;
