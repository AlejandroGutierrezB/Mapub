const express = require ('express');
const cors = require ('cors');
const morgan = require('morgan'); // log responses
const helmet = require('helmet'); // header protection middlewere
require('dotenv').config();

const router = require ('./router');
const connectDB = require('./db');

const SERVER_URL = process.env.SERVER_BASE_URL || 'http://localhost';
const PORT = process.env.PORT || 3001;

const app = express();
connectDB();

app.use(morgan('common'));
app.use(helmet());
app.use(cors());
app.use(express.json());


app.use(router);





app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log(`Server up 🚀 and listening at ${SERVER_URL}:${PORT}`);
});