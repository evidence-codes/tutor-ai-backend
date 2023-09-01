const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const { updateLevel } = require('../controllers/scores.controller');
const {
    update,
    setPassword,
    forgotPassword,
    setLanguage,
    changePassword,
    changeDp,
    increaseLessons,
    getUserInfo,
    deletes,
    user,
    suscribedUsers,
} = require('../controllers/user.controller');

router.patch('/:id', update);

router.post('/forgot-password/:id', forgotPassword);

router.patch('/set-password/:id', setPassword);

router.patch('/change-password/:id', changePassword);

router.patch('/update-level/:id', updateLevel);

router.post('/language/:id', setLanguage);

router.patch('/update-pic/:id', changeDp);

router.put('/increase', auth, increaseLessons);

router.get('/get-info', auth, getUserInfo);

router.delete('/delete', auth, deletes);

router.get('/get-users', user);

router.get('/get-suscribed-users', suscribedUsers)

module.exports = router;
