const User = require('../model/user.model');

const objectConverter = require('../utils/objectConverter')


exports.findAllUser = async(req,res) => {
    try {
        let obj = {};
        let userType = req.query.userType;
        let userStatus = req.query.userStatus;
        if(userType){
            obj["userType"] = userType
        }
        if(userStatus){
            obj["userStatus"] = userStatus
        }
        let user = await User.find(obj);

        user = objectConverter.userResponse(user);
        
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send({
            message: 'Internal server error',
            errorMessage: error.message
        })
    }
}

exports.findUserById = async(req,res) => {
    try {
        let obj = {};
        let userId = req.params.userId;
        if(userId){
            obj["userId"] = userId
        }
        let user = await User.find(obj);

        user = objectConverter.userResponse(user);
        
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send({
            message: 'Internal server error',
            errorMessage: error.message
        })
    }
}

exports.updateUserByUserId = async(req,res) => {
    try {
        const isAdmin = req.isAdmin;
        const user = await User.findOne({userId: req.params.userId});

        user.name = req.body.name ? req.body.name : user.name;

        if((req.body.userStatus || req.body.userType)) {
            if(isAdmin){
                user.userStatus = req.body.userStatus ? req.body.userStatus : user.userStatus;
                user.userType = req.body.userType ? req.body.userType : user.userType;
            }
            else {
                return res.status(401).send({
                    message: "Don't have permission to UPDATE....! Only ADMIN can access to update userStatus ad userType"
                })
            }   
        } 
        

        const updateUser = await user.save();
        
        res.status(200).send({
            "_id": updateUser._id,
            name: updateUser.name,
            email: updateUser.email, 
            userId: updateUser.userId,
            userStatus: updateUser.userStatus,
            userType: updateUser.userType,
        })
    } catch (error) {
        res.status(500).send({
            message: 'Internal server error',
            errorMessage: error.message
        })
    }
}