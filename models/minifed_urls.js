const mongoose = require('mongoose');
const { Schema } = mongoose

const schema = new Schema({
  _id: {type: mongoose.Schema.Types.ObjectId},
  originalUrl: {type: String, required: true},
  alias: {type: String, required: true, unique: true},
  baseUrl: {type: String, required: true},
  views: {type: Number, default: 0},
}, {timestamps: true});

schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  }
});

const Settings = mongoose.model("MinifiedUrls", schema, 'minified_url');
module.exports = Settings;
