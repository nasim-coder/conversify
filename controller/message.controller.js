const {Op} = require('sequelize')
const { Message, Users, Group, GroupMembers } = require('../models/index');

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
        order: [['createdAt', 'ASC']],
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
    let groupArr = [];

    // Fetch all groups the user is a member of
    const groups = await GroupMembers.findAll({
        attributes: ['group_id'],
        where: {
            user_id: id
        }
    });

    groupArr = groups.map(element => element.group_id);

    try {
        // Fetch messages involving the user as sender, receiver, or part of a group
        const messages = await Message.findAll({
            where: {
                [Op.or]: {
                    sender_id: id,
                    reciever_id: id,
                    group_id: groupArr,
                }
            },
            include: [
                { model: Users, as: 'sender' },
                { model: Users, as: 'reciever' },
                { model: Group }
            ]
        });

        const conversationMap = new Map();

        messages.forEach((message) => {
            let counterpart = null;
            let isGroup = false;

            if (message.sender_id === id && message.reciever_id === id) {
                counterpart = {
                    id: id,
                    name: 'Yourself',
                };
            } else if (message.group_id) {
                counterpart = {
                    id: message.group_id,
                    name: message.Group.name,
                };
                isGroup = true;
            } else {
                const otherUserId = message.sender_id === id ? message.reciever_id : message.sender_id;
                counterpart = {
                    id: otherUserId,
                    name: message.sender_id === id ? message.reciever.firstName : message.sender.firstName,
                };
            }

            const counterpartID = counterpart.id;
            if (!conversationMap.has(counterpartID)) {
                conversationMap.set(counterpartID, {
                    counterpart,
                    isGroup,
                    lastMessage: message.message,
                    timestamp: message.createdAt,
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
;
