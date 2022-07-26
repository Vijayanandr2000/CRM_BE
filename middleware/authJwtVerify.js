const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.config');
const User = require('../model/user.model');
const contant = require('../utils/constant'); 

exports.verifyToken = (req, res, next) => {
    try {
        let headers = req.headers['x-access-token'];

        if(!headers){
            return res.status(403).send({
                message: 'No Token is provided'
            })
        }
        jwt.verify(headers,authConfig.secret, async (err,decode) => {
            if(err){
                return res.status(401).send({
                    message: "Unauthorized User"
                })
            }
            let user = await User.findOne({userId: decode.id});

            req.userId = decode.id;
            req.isAdmin = user.userType == contant.userTypes.admin ? true : false;

            next();
        })
        
    } catch (error) {
        res.status(500).send({
            message: 'Internal Server Error',
            errorMessage: error.message
        })
    }
}

exports.checkIsValidUserId = async(req, res, next) => {
    try {
        let user = await User.findOne({userId: req.params.userId});
        if(!user){
            return res.status(401).send({
                message: "Invalid User ID"
            })
        }
        next()
    } catch (error) {
        res.status(500).send({
            message: 'Internal Server Error',
            errorMessage: error.message
        })
    }

}

exports.checkIsAdmin = async(req, res, next) => {
    try {
        let user = await User.find({userId: req.userId});

        if(user[0].userType !== contant.userTypes.admin){
            return res.status(401).send({
                message: "Don't have permission to access only ADMIN can access"
            })
        }
        next()
    } catch (error) {
        res.status(500).send({
            message: 'Internal Server Error',
            errorMessage: error.message
        })
    }

}

exports.checkIsAdminOrOwner = async (req, res, next) => {
    try {
        let user = await User.find({userId: req.userId});
        
        if((user[0].userType === contant.userTypes.admin) || (user[0].userId == req.params.userId)){
            return next();
        }
        return res.status(401).send({
            message: "Don't have permission to access only ADMIN and OWNER can access"
        })
    } catch (error) {
        res.status(500).send({
            message: 'Internal Server Error',
            errorMessage: error.message
        })
    }
}