const { Message, Users } = require('../models/index');

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
            sender_id: id,
            reciever_id
        },
        order: [['createdAt', 'DESC']],
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
