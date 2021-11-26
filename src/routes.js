var router = require('express').Router();
const postinghandler = require('../src/controllers/Postapi');
const gettinghandler = require('../src/controllers/Getapi');
const auth = require('../src/middleware/auth')

router.post('/user', async (req, res) => {
    postinghandler.HandlePostApi(req, res);
});


router.get('/user', auth, async (req, res) => {
    gettinghandler.HandleGetApi(req, res);
});


module.exports = router;