const axios = require("axios");
let seeMean = async function (req, res) {
  try {
    let options = {
      method: "post",
      url: "https://api.imgflip.com/caption_image",
    };
    let result = await axios(options);
    res.status(200).send({ data: result.data, status: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: false, msg: "server error" });
  }
};

/*********************************It's public**********************************/
module.exports.seeMean = seeMean;
