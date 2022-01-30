const express = require('express');

const router = express.Router();

const passport =require('passport');

const usersController = require('../controllers/users_controllers');




router.get('/profile',passport.checkAuthentication,usersController.profile); 
router.post('/update/:id',passport.checkAuthentication,usersController.update); 


router.get('/sign-in',usersController.signin);
router.get('/sign-up',usersController.signup); 

router.post('/create',usersController.create);

//use passport as a midleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {
        failureRedirect:'/users/sign-in'
    },
),usersController.createSession);


router.get('/sign-out',usersController.destroySession);


router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sigin-in'}),usersController.createSession);

module.exports = router;