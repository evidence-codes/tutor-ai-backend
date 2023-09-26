const router = require('express').Router();
const {
    create,
    login,
    getAUser,
    newSignup,
    subscribers,
    invoice,
    getAllAdmins,
    toggleAdminStatus,
    deleteAdmins,
    getAllDashboardInfo,
    getAllReviews,
    changePassword,
    unSubscribers,
} = require('../controllers/admin.controller');
const { statistics } = require('../controllers/statistics.controller');
const auth = require('../middlewares/auth.middleware');

router.post('/create-admin', auth, create);

router.post('/admin-login', login);

router.get('/get-all-admins', auth, getAllAdmins);

router.patch('/update-admin-status', auth, toggleAdminStatus);

router.patch('/delete-admins', auth, deleteAdmins);

router.get('/get-dashb-info', auth, getAllDashboardInfo);

router.get('/get-all-reviews', auth, getAllReviews);

router.patch('/change-pwd', auth, changePassword);

router.get('/get-all-subscribers', auth, subscribers);

router.get('/new-signups', auth, newSignup);

router.get('/get-a-user', auth, getAUser);

router.get('/get-all-unsubscribers', auth, unSubscribers);

router.get('/get-invoice-data', auth, invoice);

router.get('/statistics', statistics)

module.exports = router;
