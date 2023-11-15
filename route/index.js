const { Router } = require('express');
const allRoute = Router();
const userRoute = require('./user.route');
const groupRoute = require('./group.route');
const messageRoute = require('./message.route');

allRoute.use('/user', userRoute);
allRoute.use('/group', groupRoute);
allRoute.use('/message', messageRoute);

module.exports = allRoute;