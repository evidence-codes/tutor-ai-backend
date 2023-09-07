const router = require('express').Router();
const { create, login, noOfUser, subscribedUsers, getAllUsers, newSignup, subscribers } = require('../controllers/admin.controller');

router.post('/create-admin', create)

router.post('/admin-login', login)

router.get('/get-users', noOfUser);

router.get('/get-subscribed-users', subscribedUsers)

router.get('/get-all-users', getAllUsers)

router.get('/new-signup', newSignup);

router.get('/subscribers', subscribers);



module.exports = router;