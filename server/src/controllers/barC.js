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
  const barChecker = await Bar.findOne({barName:bar.barName});

  if (barChecker) {
    const error = new Error('Bar already exists.');
    res.status(400);
    res.json({message: error.message,});
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
    res.status(200)
    res.json(bar);
  } catch (error) {
    console.log(error);//eslint-disable-line
    res.sendStatus(500);
  }
}
async function updateBarBeers (req, res) {
  try {
    const newBeer = req.body.beerList
    const bar = await Bar.findByIdAndUpdate(
      { _id: req.params.id },
      {  beerList: newBeer  },
      { new: true }, //make update and then receive the response
    );
    res.status(200);
    res.json(bar);
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
};