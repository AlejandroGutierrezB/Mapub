const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BarSchema = new Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  venue: { type: String, required: true },
});

module.exports = mongoose.model('Bar', BarSchema);
