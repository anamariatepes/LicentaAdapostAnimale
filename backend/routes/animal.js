const express = require('express')
const router = express.Router();

const { getAnimals,
     newAnimal, 
     getSingleAnimal,
     updateAnimal, 
     deleteAnimal 
    } = require('../controllers/animalController')

    const { isAuthenticatedUser, authorizeRoles} = require('../middlewares/auth');


router.route('/animals').get(getAnimals);
router.route('/animal/:id').get(getSingleAnimal);


router.route('/admin/animal/new').post(isAuthenticatedUser,authorizeRoles('admin'), newAnimal);

router.route('/admin/animal/:id')
                    .put(isAuthenticatedUser,authorizeRoles('admin'), updateAnimal)
                    .delete(isAuthenticatedUser,authorizeRoles('admin'), deleteAnimal);


module.exports = router;