const ticketController  = require("../controller/ticket");
const { authJwtVerify, ticketValidator } = require("../middleware")

module.exports = (app) => {
    app.post(
        "/crm/api/v1/ticket", 
        [authJwtVerify.verifyToken],
        ticketController.createTicket
    );

    app.get(
        "/crm/api/v1/ticket", 
        [authJwtVerify.verifyToken],
        ticketController.getAllTicket
    );

    app.put("/crm/api/v1/ticket/:ticketId", [authJwtVerify.verifyToken, ticketValidator.isValidOwnerOfTheTicket], ticketController.updateTicket);

}