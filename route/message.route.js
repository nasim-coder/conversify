const { Router } = require('express');
const messageRoute = Router();
const controller = require('../controller/message.controller');

messageRoute.post('/create-message', controller.sendMessage)
messageRoute.get('/group-messages', controller.retrieveGroupMessages);
messageRoute.get('/conversation', controller.conversation);
messageRoute.delete('/delete-message', controller.deleteMessage);

module.exports = messageRoute;

/*
Message Management:

POST /api/message: Send a message to a user or a group.
GET /api/message/:messageId: Retrieve message details.
DELETE /api/message/:messageId: Delete a message (sender or admin-only).
GET /api/user/:userId/messages: Retrieve a user's messages.
GET /api/group/:groupId/messages: Retrieve messages within a group.
*/
