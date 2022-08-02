const cron = require('node-cron');
const Notification = require('../model/notification.model');
const transporter = require('../notification/notificationService');

cron.schedule('* */5 * * * *', async() => {
    try {
        const notifications = await Notification.find({ 
            status: false,
        })
    
        notifications.forEach((notification) => {
            let mailObj = {
                from : 'noreply@gmail.com',
                to : notification.recepientEmail,
                subject : notification.subject,
                text : notification.content
            }
    
            transporter.sendMail(mailObj, async(err)=>{
                if(err){
                    console.log(err.message);
                }else{
                    notification.status = true;
    
                    await notification.save()
                    console.log("email sent successfully");
                }
            })
    
        })
    } catch (error) {
        console.log("error", error.message);
        return res.status(500).send({
            message: "Internal Serer error",
            errorMessage: error.message
        })
    }


});