const { Users, Group, GroupMembers, Message } = require('../models/index');
const { Op } = require('sequelize');
exports.createGroup = async (req, res) => {


    const { id } = req.data;
    let { name, users } = req.body;
    const createdGroup = await Group.create({ name });
    let arr = [{ user_id: id, group_id: createdGroup.id, isAdmin: true }];
    users = JSON.parse(users);

    users.forEach(ele => { arr.push({ user_id: ele, group_id: createdGroup.id }) });

    const createdMemembers = await GroupMembers.bulkCreate(arr, { returning: true });
    res.status(201).send({ success: true, message: 'group created successfully' });

}

exports.GroupDetails = async (req, res) => {

    const { group_id } = req.query;
    const { id } = req.data;

    const user = await GroupMembers.findOne({
        where: {
            group_id,
            user_id: id,
        }
    })
    if (!user) {
        return res.status(403).send({ success: false, message: 'Unauthorized request' });
    }

    const groupDetails = await Group.findOne({
        attributes: ['id', 'name'],
        where: {
            id: group_id
        },
        include: [
            {
                model: GroupMembers,
                attributes: ['id', 'isAdmin'],
                include: [{ model: Users, attributes: ['firstName', 'lastName', 'email'] }]
            }
        ]
    })
    res.status(200).send({ success: true, data: groupDetails });
}

exports.updateGroupName = async (req, res) => {
    const { name } = req.body;
    const { group_id } = req.query;
    const { id } = req.data;
    const user = await GroupMembers.findOne({
        where: {
            group_id,
            isAdmin: true,
        }
    })
    console.log('user', user.user_id);
    if (id != user.user_id) {
        return res.status(403).send({ success: false, message: 'Unauthorized request' });
    }
    const updated = await Group.update(
        { name },
        {
            where: {
                id: group_id
            }
        });
    if (updated[0] > 0) {
        return res.status(200).send({ success: true, message: 'updated suyccesfully' });
    } else {
        return res.status(200).send({ success: false, message: 'could not be updated' });
    }
}

exports.deleteGroup = async (req, res) => {
    const { group_id } = req.query;
    const { id } = req.data;
    const user = await GroupMembers.findOne({
        where: {
            group_id,
            isAdmin: true,
        }
    })
    if (id != user.user_id) {
        return res.status(403).send({ success: false, message: 'Unauthorized request' });
    }
    const destroyGMem = await GroupMembers.destroy({ where:{group_id} });
    const destroyedGMessages = await Message.destroy({ where: { group_id } });
    const destroyGroup = await Group.destroy({
        where: {
            id: group_id
        }
    });
    return res.status(200).send({ success: true, message: 'group and its assocaiated data has been deleted' })
}

exports.addMemeberInGroup = async (req, res) => {
    const { group_id } = req.query;
    let {users} = req.body;
    const { id } = req.data;
    const user = await GroupMembers.findOne({
        where: {
            group_id,
            isAdmin: true,
        }
    })
    if (id != user.user_id) {
        return res.status(403).send({ success: false, message: 'Unauthorized request' });
    }

    users = JSON.parse(users);
    let arr = [];
    users.forEach(ele => { arr.push({ user_id: ele, group_id }) });
    const createdMemembers = await GroupMembers.bulkCreate(arr, { ignoreDuplicates: true });
    return res.status(403).send({ success: false, message: 'user added succesfully', data: createdMemembers});
}

exports.removeMemberFromGroup = async (req, res) => {
    const { group_id } = req.query;
    let {users} = req.body;
    const { id } = req.data;
    const user = await GroupMembers.findOne({
        where: {
            group_id,
            isAdmin: true,
        }
    })
    if (id != user.user_id) {
        return res.status(403).send({ success: false, message: 'Unauthorized request' });
    }
    users = JSON.parse(users);
    const destroyed = await GroupMembers.destroy({
        where: {
            group_id,
            user_id: {
                [Op.in]: users,
            }
        }
    })
    return res.status(200).send({ success: true, message: `${destroyed} userss have been removed` })
}

