const Ticket = require("../model/ticket.model");
const User = require("../model/user.model");
const constant = require("../utils/constant");
const sendNotification = require("../utils/notificationClient");

exports.createTicket = async(req,res) => {
    try {
        let { title, description, ticketPriority, status } = req.body;
        const ticObj = {
            title, 
            description, 
            ticketPriority, 
            status,
            reporter: req.userId
        }

        let engineer = await User.find({
            userType: constant.userTypes.engineer,
            userStatus: constant.userStatus.approved
        });

        //Engineer with less ticket will assign 
        engineer = engineer.sort((a, b) => {
            // a.ticketAssigneed.length - b.ticketAssigneed.length
            if(a.ticketAssigneed.length < b.ticketAssigneed.length) {
                return -1;
             } else {
                return 1;
             }
        })[0];

        if(engineer){
            ticObj.assignee = engineer.userId;
            const ticketCreated = await Ticket.create(ticObj);

            if(ticketCreated){
                const customer = await User.findOne({
                    userId : req.userId
                });
                customer.ticketCreated.push(ticketCreated._id);
                await customer.save()
                
                if(engineer){
                    engineer.ticketAssigneed.push(ticketCreated._id);
                    await engineer.save();
                }

                // subject, content, recepients, requester -> FOR CUSTOMER EMAIl
                sendNotification(
                    `Ticket created In CRM` , 
                    `Your Ticket Created successfully...! with tracking id ${ticketCreated._id}`,
                    `${customer.email}`, 
                    "CRM APP"
                );

                // FOR ASSIGNEE EMAIL
                sendNotification(
                    `New Ticket Assigned` , 
                    `New Ticket Assigned to you...! with tracking id ${ticketCreated._id} with priority ${ticketCreated.ticketPriority}`,
                    `${engineer.email}`, 
                    "CRM APP"
                );

                return res.status(201).send(ticketCreated);
            }
        } else {
            return res.status(401).send({
                message: 'NO ENGINEERS AVAILABLE',
            })
        }

        
    } catch (error) {
        res.status(500).send({
            message: 'Internal server error',
            errorMessage: error.message
        })
    }
}

exports.getAllTicket = async(req, res) => {
    try {

        const user = await User.findOne({ userId: req.userId });
        const queryObj = {};
        const ticketsCreated = user.ticketCreated; 
        const ticketsAssigned = user.ticketAssigneed;

        if (user.userType == constant.userTypes.customer) {
            if (!ticketsCreated) {
                return res.staus(200).send({
                    message: "No tickets created by the user yet"
                });
            };

            queryObj["_id"] = { $in: ticketsCreated };

        } else if (user.userType == constant.userTypes.engineer) {
            queryObj["$or"] = [{ "_id": { $in: ticketsCreated } }, { "_id": { $in: ticketsAssigned } }];
        }

        const tickets = await Ticket.find(queryObj);

        res.status(200).send(tickets);
        
    } catch (error) {
        res.status(500).send({
            message: 'Internal server error',
            errorMessage: error.message
        })
        
    }
}

exports.updateTicket = async (req, res) => {

    try {

        const ticket = await Ticket.findOne({ "_id": req.params.ticketId });

        ticket.title = req.body.title != undefined ? req.body.title : ticket.title;

        ticket.description = req.body.description != undefined ? req.body.description : ticket.description;

        ticket.ticketPriority = req.body.ticketPriority != undefined ? req.body.ticketPriority : ticket.ticketPriority;

        ticket.status = req.body.status != undefined ? req.body.status : ticket.status;

        ticket.assignee = req.body.assignee != undefined ? req.body.assignee : ticket.assignee;

        const updatedTicket = await ticket.save();
        
        const customer = await User.findOne({ 
            "userId":  updatedTicket.reporter 
        });

        const engineer = await User.findOne({ 
            "userId":  updatedTicket.assignee 
        });

        // subject, content, recepients, requester -> FOR CUSTOMER EMAIl
        sendNotification(
            `Ticket Updated In CRM` , 
            `Your Ticket Updated successfully...! with tracking id ${updatedTicket._id}`,
            `${customer.email}`, 
            "CRM APP"
        );

        // FOR ASSIGNEE EMAIL
        sendNotification(
            `Ticket Updated In CRM...` , 
            `Your Ticket is Updated which is Assigned to You...! with tracking id ${updatedTicket._id} with priority ${updatedTicket.ticketPriority}`,
            `${engineer.email}`, 
            "CRM APP"
        );


        res.status(200).send(updatedTicket);
    
    } catch (err) {
        console.log("Some error while updating ticket ", err.message);
        res.status(500).send({
            message: "Some internal error while updating the ticket"
        })
    }
}