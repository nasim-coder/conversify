const {Router} = require('express');
const groupRoute = Router();
const controller = require('../controller/group.controller');

groupRoute.post('/create', controller.createGroup);
groupRoute.get('/details', controller.GroupDetails);
groupRoute.patch('/change-name', controller.updateGroupName);
groupRoute.delete('/delete', controller.deleteGroup);
groupRoute.patch('/add-member', controller.addMemeberInGroup);
groupRoute.patch('/remove-member', controller.removeMemberFromGroup);

module.exports = groupRoute;

