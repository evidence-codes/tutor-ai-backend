const router = require('express').Router();
const {
    create,
    login,
    noOfUser,
    subscribedUsers,
    getAllUsers,
    newSignup,
    subscribers,
    invoice,
    getAllAdmins,
    toggleAdminStatus,
    deleteAdmins,
} = require('../controllers/admin.controller');
const auth = require('../middlewares/auth.middleware');

router.post('/create-admin', auth, create);

router.post('/admin-login', login);

router.get('/get-users', noOfUser);

router.get('/get-subscribed-users', subscribedUsers);

router.get('/get-all-users', getAllUsers);

router.get('/new-signup', newSignup);

router.get('/subscribers', subscribers);

router.get('/get-invoice-data', invoice);

router.get('/get-all-admins', auth, getAllAdmins);

router.patch('/update-admin-status', auth, toggleAdminStatus);

router.patch('/delete-admins', auth, deleteAdmins);

module.exports = router;
