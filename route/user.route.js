const {Router} = require('express');
const userRoute = Router();
const controller = require('../controller/user.controller');
const { isLoggedIn } = require('../middleware/auth');
userRoute.post('/signup', controller.register);
userRoute.post('/login', controller.signin);
userRoute.get('/list',isLoggedIn, controller.userList);

module.exports = userRoute;