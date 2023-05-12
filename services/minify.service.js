const {nanoid} = require("nanoid");
const {MinifiedUrls} = require('../helpers/db')
const {baseUrl} = require("../config.json");
const mongoose = require("mongoose");

module.exports = {
  create,
}

async function create(data, res) {
  if (!data.originalUrl) {
    throw "Url is required";
  }
  const alias = nanoid(5)
  try {
    const aliasPresent = await MinifiedUrls.findOne({alias})
    if (aliasPresent) {
      return res.status(400).json({success: false})
    }
  } catch (error) {
    console.error(error)
  }

  const urlsEntity = new MinifiedUrls({
    originalUrl: data.originalUrl,
    alias: alias,
    baseUrl: baseUrl,
  });

  urlsEntity._id = new mongoose.Types.ObjectId()
  return await urlsEntity.save();
}
