const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const BeerSchema = new Schema({
//     beerName: { type: String, require: true },
//     price: { type: Number, require: true, min: 0 },
//     size: { type: String, require: true }
// }, {
//   timestamps: false,
//   versionKey: false,
// });


const BarSchema = new Schema({
  barName: { type: String, require: true },
  latitude: { type: Number, require: true },
  longitude: { type: Number, require: true },
  tlf: { type: Number },
  openHour: { type: String},
  closeHour: { type: String},
  beerList: { type : Array , "default" : [] },
}, {
  timestamps: true,
  versionKey: false,
});


module.exports = mongoose.model('Bar', BarSchema);
