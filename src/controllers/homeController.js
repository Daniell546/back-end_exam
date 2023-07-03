const express = require('express');
const router = express.Router();
const homeManager = require('../managers/homeManager');
const { getDifficultyOptions } = require("../utils/viewHelpers");



router.get('/', async (req, res) => {
    const animals = await homeManager.getLastThree();

    res.render('home', {animals})
});

router.get('/search', async (req, res) => {
    const { location } = req.query;

    const animals = await homeManager.getAll(location);
    res.render('search', {animals, location})
})




module.exports = router;