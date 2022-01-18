const express = require('express');

const router = express.Router();

const passport =require('passport');

const usersController = require('../controllers/users_controllers');




router.get('/profile',passport.checkAuthentication,usersController.profile); 
router.post('/update/:id',passport.checkAuthentication,usersController.update); 


router.get('/sign-in',usersController.signin);
router.get('/sign-up',usersController.signup); 

router.post('/create',usersController.create);

//use passportas a midleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {
        failureRedirect:'/users/sign-in'
    },
),usersController.createSession);


router.get('/sign-out',usersController.destroySession);
module.exports = router;