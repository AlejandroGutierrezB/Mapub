const router = require('express').Router();
const bar = require('./controllers/barC');


router.get('/bars', bar.getAll);
router.get('/bars/:id', bar.getBar);

router.put('/bars/:id/update', bar.updateBarBeers);

router.post('/bars', bar.postBar);

router.delete('/bars/:id', bar.deleteBar);

module.exports = router;