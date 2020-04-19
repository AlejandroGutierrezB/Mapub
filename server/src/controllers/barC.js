const Bar = require('../models/barM');

async function getAll (req, res) {
  try {
    const bars = await Bar.find();
    res.status(200).json(bars);
  } catch (error) {
    console.log(error); //eslint-disable-line
    res.sendStatus(500);
  }
}
async function postBar (req, res) {
  try {
    const newBar = await Bar.create({
      title: req.body.title,
      venue: req.body.venue,
      date: req.body.date,
    });
    res.status(200).json(newBar);
  } catch (error) {
    console.log(error); //eslint-disable-line
    res.sendStatus(500);
  }
}

module.exports = {
  getAll,
  postBar,
};