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
  const bar = req.body;
  const barChecker = await Bar.findOne({ barName: bar.barName });

  if (barChecker) {
    const error = new Error('Bar already exists.');
    res.status(400);
    res.json({ message: error.message, });
  } else {
    try {
      const newBar = await Bar.create({
        barName: req.body.barName,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        tlf: req.body.tlf,
        openHour: req.body.openHour,
        closeHour: req.body.closeHour,
        beerList: req.body.beerList,
      });
      res.status(200).json(newBar);
    } catch (error) {
      console.log(error); //eslint-disable-line
      res.sendStatus(500);
    }
  }
}

async function getBar (req, res) {
  try {
    const bar = await Bar.findById({ _id: req.params.id });
    res.status(200);
    res.json(bar);
  } catch (error) {
    console.log(error);//eslint-disable-line
    res.sendStatus(500);
  }
}

async function deleteBar (req, res) {
  try {
    const bar = await Bar.findByIdAndDelete({ _id: req.params.id });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);//eslint-disable-line
    res.sendStatus(500);
  }
}

async function updateBarBeers (req, res) {
  const bar = req.params.id;
  const newBeer = req.body;
  const beerChecker = await Bar.findOne({ _id: bar, beerList: newBeer });

  if (beerChecker) {
    const error = new Error('Beer info already existed in this bar.');
    res.status(400);
    res.json({ message: error.message, });
  } else {
    try {
      const bar = await Bar.findByIdAndUpdate(
        { _id: req.params.id },
        { $push: { beerList: newBeer } },
        { new: true }, //make update and then receive the response
      );
      res.status(200);
      res.json(bar);
    } catch (error) {
      console.log(error);//eslint-disable-line
      res.sendStatus(500);
    }
  }
}

async function filterBar (req, res) {
  try {
    console.log('req.params: ', typeof req.params.filter);
    const beer = req.params.filter; // get it as the req.body and change also the router
    const bars = await Bar.find({ "beerList.beerName": beer });
    res.status(200);
    res.json(bars);
  } catch (error) {
    console.log(error);//eslint-disable-line
    res.sendStatus(500);
  }
}

module.exports = {
  getAll,
  postBar,
  getBar,
  updateBarBeers,
  deleteBar,
  filterBar
};