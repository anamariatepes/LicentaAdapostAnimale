const express = require('express')
const router = express.Router();

const {
    newAdoption,
    getSingleAdoption,
    myAdoptions,
    allOptions,
    updateAdoption,
    deleteAdoption

} = require('../controllers/adoptionController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.route('/adoption/new').post(isAuthenticatedUser, newAdoption);

router.route('/adoption/:id').get(isAuthenticatedUser, getSingleAdoption);
router.route('/adoptions/me').get(isAuthenticatedUser, myAdoptions);

router.route('/admin/adoptions/').get(isAuthenticatedUser, authorizeRoles('admin'), allOptions);

router.route('/admin/adoption/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateAdoption)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteAdoption);

module.exports = router;