const { Router } = require('express');
const messageRoute = Router();
const controller = require('../controller/message.controller');
const { isLoggedIn } = require('../middleware/auth');

messageRoute.post('/send-message', isLoggedIn, controller.sendMessage)
messageRoute.get('/group-messages', isLoggedIn, controller.retrieveGroupMessages);
messageRoute.get('/conversation', isLoggedIn, controller.conversation);
messageRoute.delete('/delete-message', isLoggedIn, controller.deleteMessage);
messageRoute.get('/recent-chats', isLoggedIn, controller.recentConversationsList)
module.exports = messageRoute;

