const Notification = require('../model/notification.model');

exports.createNotificationRequest = async(req, res) => {
    try {
        let { 
            subject,
            recepientEmail,
            content,
            requestor,
            status
        } = req.body;

        const notificationObj = {
            subject,
            recepientEmail,
            content,
            requestor,
            status
        }

        const notification = await Notification.create(notificationObj)
        
        return res.status(201).send({
            message: `Request Accepted`,
            trackingId: notification._id
        })
    } catch (error) {
        res.status
        (500).send({
            message: 'Some Internal Server Error',
            errorMessage: error.message
        })
    }
}

exports.getNotificationDetail = async(req, res) => {
    try {

        let trackingId = req.params.id

        const notification = await Notification.findOne({_id: trackingId});

        if(notification){
            res.status(200).send(notification)
        } else{
            res.status(200).send({
                message: 'Notification not found',
                notification
            })
        }
        
    } catch (error) {
        res.status
        (500).send({
            message: 'Some Internal Server Error',
            errorMessage: error.message
        })
    }
}