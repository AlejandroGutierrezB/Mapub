const router = require('express').Router();
const bar = require('./controllers/barC');


router.get('/', (req,res) => {
  res.json({
    message: 'Hello',
  })
})
router.get('/bars', bar.getAll);
router.post('/bars', bar.postBar);

//TODO this would be middlewares in different file
// router.use((req,res,next) => {
//   const error = new Error(`Not FOUND - ${req.originalUrl}`);
//   res.status(404);
//   next(error);
// })
// app.use((error, req, res, next) => {
//   const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
//   res.status(statusCode);
//   res.json({
//     message: error.message,
//     stack: process.env.NODE_ENV === 'production' ? '💩' : error.stack,
//   })
// })



module.exports = router;