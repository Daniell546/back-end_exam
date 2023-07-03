const router = require('express').Router();
const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');
const animalsController = require('./controllers/animalsController');

router.use(homeController);
router.use('/user', userController)
router.use('/animals', animalsController);
router.use('*', (req, res) => {
    res.render('404');
})


module.exports = router;