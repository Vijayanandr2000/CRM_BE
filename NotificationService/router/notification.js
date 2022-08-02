
const notificationController = require('../controller/notification')

module.exports = (app) => {

    app.post("/notiserv/api/v1/notifications", notificationController.createNotificationRequest)

    app.get("/notiserv/api/v1/notifications/:id", notificationController.getNotificationDetail)
}