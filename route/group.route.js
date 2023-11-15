const { Router } = require('express');
const groupRoute = Router();
const controller = require('../controller/group.controller');
const { isLoggedIn } = require('../middleware/auth');

groupRoute.post('/create', isLoggedIn, controller.createGroup);
groupRoute.get('/details', isLoggedIn, controller.GroupDetails);
groupRoute.patch('/change-name', isLoggedIn, controller.updateGroupName);
groupRoute.delete('/delete', isLoggedIn, controller.deleteGroup);
groupRoute.patch('/add-member', isLoggedIn, controller.addMemeberInGroup);
groupRoute.patch('/remove-member', isLoggedIn, controller.removeMemberFromGroup);
groupRoute.get('/group-list', isLoggedIn, controller.groupList)
module.exports = groupRoute;

//GET /api/user/:userId/groups: Retrieve the list of groups a user is a member of.//