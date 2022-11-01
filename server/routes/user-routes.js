const express = require('express');
const router = express.Router();

const { authenticateUser, authorizePermissions } = require('../middleware/authentification');

const {
    getAllUsers,
    getSingleUser,
    updatePassword,
    updateUser,
    showCurrentUser,
    updateUserStat
}= require('../controllers/userController');

router
    .route('/')
    .get( authenticateUser, getAllUsers ); //Add the Premission// roles later
router
    .route('/showMe')
    .get(authenticateUser, showCurrentUser)
    .patch(authenticateUser, updateUserStat);
router
    .route('/updateUser')
    .patch(authenticateUser, updateUser);
router
    .route('/updatePassword')
    .patch(authenticateUser, updatePassword);

router
    .route('/:id')
    .get(authenticateUser, getSingleUser);

module.exports = router;