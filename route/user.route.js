const {Router} = require('express');
const userRoute = Router();
const controller = require('../controller/user.controller');
const { isLoggedIn } = require('../middleware/auth');

userRoute.post('/signup', controller.register);
userRoute.post('/login', controller.signin);
userRoute.get('/list',isLoggedIn, controller.userList);
userRoute.get('/detail', controller.userDetails);

module.exports = userRoute;

//GET /api/user/:userId/groups: Retrieve the list of groups a user is a member of.//