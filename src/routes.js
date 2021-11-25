var router = require('express').Router();
const postinghandler = require('../src/controllers/Postapi');
const gettinghandler = require('../src/controllers/Getapi');


router.post('/user', async (req, res) => {
    postinghandler.HandlePostApi(req, res);
});


router.get('/user', async (req, res) => {
    gettinghandler.HandleGetApi(req, res);
});


module.exports = router;