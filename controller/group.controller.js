const { Op } = require('sequelize');
const {Group, GroupMembers, Message} = require('../models/index');

exports.createGroup = async (req, res)=>{

    const { id } = req.data;
    let {name, users} = req.body;
    const createdGroup = await Group.create({name});
    let arr = [{user_id: id, group_id: createdGroup.id, isAdmin: true}];
    users = JSON.parse(users);
    
    users.forEach(ele => { arr.push({user_id: ele, group_id: createdGroup.id})});

    const createdMemembers = await GroupMembers.bulkCreate(arr, {returning: true});
    res.status(201).send({success: true, message: 'group created successfully'});

}

exports.GroupDetails = async (req, res)=>{
    const {group_id} = req.query;
   const groupDetails =  await Group.findOne({
        where:{
            id: group_id
        },
        include:[{model: GroupMembers}]
    })
    res.status(200).send({success: true, data: groupDetails});
}

exports.updateGroupName = async (req, res)=>{
    const {name} = req.body;
    const {group_id} = req.query;
    const updated = await Group.update(
        {name},
        {
            where: {
            id: group_id
        }
    });
    if(updated[0]>0){
        return res.status(200).send({success: true, message: 'updated suyccesfully'});
    }else{
        return res.status(200).send({success: false, message: 'could not be updated'});
    }
}

exports.deleteGroup = async (req, res)=>{
    const {group_id} = req.query;
    const {id} = req.data;
    const user = await GroupMembers.findOne({
        where:{
            group_id,
            isAdmin: true,
        }
    })
    if(id != user.user_id){
       return res.status(403).send({success: false, message: 'Unauthorized request'});
    }
    const destroyGMem = await GroupMembers.destroy({where: group_id});
    const destroyedGMessages = await Message.destroy({where:{group_id}});
    const destroyGroup = await Group.destroy({where:{
        id: group_id
    }});
    return res.status(200).send({success: true, message: 'group and its assocaiated data has been deleted'})
}

exports.addMemeberInGroup = async (req, res)=>{
    let {group_id, users} = req.query;
    const {id} = req.data;
    const user = await GroupMembers.findOne({
        where:{
            group_id,
            isAdmin: true,
        }
    })
    if(id != user.user_id){
       return res.status(403).send({success: false, message: 'Unauthorized request'});
    }

   users = JSON.parse(users);
    let arr=[];
    users.forEach(ele => { arr.push({user_id: ele, group_id})});
    const createdMemembers = await GroupMembers.bulkCreate(arr, {returning: true});
}

exports.removeMemberFromGroup = async (req, res)=>{
    let {group_id, users} = req.query;
    const {id} = req.data;
    const user = await GroupMembers.findOne({
        where:{
            group_id,
            isAdmin: true,
        }
    })
    if(id != user.user_id){
       return res.status(403).send({success: false, message: 'Unauthorized request'});
    }
    users = JSON.parse(users);
    const destroyed = await GroupMembers.destroy({
        where:{
            group_id,
            user_id:{
                [Op.in]: users,
            }
        }
    })
    return res.status(200).send({success: true, message: 'userss have been removed', data: destroyed})
}

