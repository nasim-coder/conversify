const {Op} = require('sequelize')
const { Message, Users, Group } = require('../models/index');

exports.sendMessage = async (req, res) => {
    const { group_id, reciever_id } = req.query;
    const { id } = req.data;
    const { message } = req.body;
    const messg = await Message.create({ message, sender_id: id, reciever_id, group_id });
    return res.status(201).send({ success: true, message: 'message sent successfully', data: messg });
}


exports.retrieveGroupMessages = async (req, res) => {

    const { group_id } = req.query;
    const messages = await Message.findAll({
        attributes: ['id', 'message'],
        where: {
            group_id
        },
        include: [{ model: Users, as: 'sender', attributes: ['id', 'firstName', 'lastName'] }],
        order: [['createdAt', 'DESC']],
    });

    return res.status(200).send({ success: true, data: messages })
}

exports.conversation = async (req, res) => {
    const { reciever_id } = req.query;
    const { id } = req.data;
    const conversation = await Message.findAll({
        attributes: ['id', 'message'],
        where: {
            [Op.or]: [
                {
                  sender_id: id,
                  reciever_id,
                },
                {
                  sender_id: reciever_id,
                  reciever_id: id,
                },
              ],
        },
        order: [['createdAt', 'ASC']],
        include: [{ model: Users, as: 'sender', attributes: ['id','firstName', 'lastName'] }, { model: Users, as: 'reciever', attributes: ['id','firstName', 'lastName'] }]
    });
    return res.status(200).send({ success: true, data: conversation });
}

exports.deleteMessage = async (req, res) => {
    const { message_id } = req.query;
    const { id } = req.data;

    const deleted = await Message.destroy({
        where: {
            id: message_id,
            sender_id: id
        }
    })

    return res.status(200).send({ success: true, messages: `${deleted} Message deleted successfully` });
}


exports.recentConversationsList = async (req, res) => {
    const { id } = req.data;
  
    try {
      const recentConversations = await Message.findAll({
        where: {
          [Op.or]: [
            { sender_id: id },
            { reciever_id: id },
          ],
        },
        include: [{ model: Users, as: 'sender' }, { model: Users, as: 'reciever' }, { model: Group }],
        order: [['createdAt', 'DESC']],
        limit: 10,
      });
  
      const conversationMap = new Map();
  
      recentConversations.forEach((conversation) => {
        let counterpart = null;
        let isGroup = false;
  
        if (conversation.sender_id === conversation.reciever_id) {
          counterpart = {
            id: id,
            name: 'Yourself',
          };
        } else if (conversation.group_id) {
          counterpart = {
            id: conversation.group_id,
            name: conversation.Group.name,
          };
          isGroup = true;
        } else if (conversation.sender_id === id) {
          counterpart = {
            id: conversation.reciever_id,
            name: conversation.reciever.firstName,
          };
        } else {
          counterpart = {
            id: conversation.sender_id,
            name: conversation.sender.firstName,
          };
        }
  
        const counterpartID = counterpart.id;
        if (!conversationMap.has(counterpartID)) {
          conversationMap.set(counterpartID, {
            id: conversation.id,
            counterpart,
            isGroup,
            lastMessage: conversation.message,
            timestamp: conversation.createdAt,
          });
        }
      });
  
      const conversationList = Array.from(conversationMap.values());
  
      res.status(200).send({ success: true, data: conversationList });
    } catch (error) {
      console.error("Error fetching recent conversations:", error);
      res.status(500).send({ success: false, error: "Server error" });
    }
  };
  