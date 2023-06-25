const router = require('express').Router();
const { updateLevel } = require('../controllers/scores.controller');
const {
    update,
    setPassword,
    forgotPassword,
    setLanguage,
    changePassword,
    changeDp,
} = require('../controllers/user.controller');

router.patch('/:id', update);

router.post('/forgot-password/:id', forgotPassword);

router.patch('/set-password/:id', setPassword);

router.patch('/change-password/:id', changePassword);

router.patch('/update-level/:id', updateLevel);

router.post('/language/:id', setLanguage);

router.patch('/update-pic/:id', changeDp);

module.exports = router;
