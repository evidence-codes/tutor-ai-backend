const router = require('express').Router();
const {
    create,
    login,
    getAllUsers,
    newSignup,
    subscribers,
    invoice,
    getAllAdmins,
    toggleAdminStatus,
    deleteAdmins,
    getAllDashboardInfo,
    getAllReviews,
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

router.get('/get-all-users', getAllUsers);

router.get('/new-signup', newSignup);

router.get('/subscribers', subscribers);

router.get('/get-invoice-data', invoice);

router.get('/statistics', statistics)

module.exports = router;
