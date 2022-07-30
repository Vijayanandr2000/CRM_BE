const User = require('../model/user.model');
const Ticket = require('../model/ticket.model');
const constant = require('../utils/constant');

exports.isValidOwnerOfTheTicket = async (req, res, next) => {

    const user = await User.findOne({userId: req.userId});

    const ticket = await Ticket.findOne({_id: req.params.ticketId});

    let ownerId;

    if(user.userType === constant.userTypes.customer){

        ownerId = ticket.reporter;

        if(user.userId !== ownerId){
            return res.status(403).send({
                message: "Only ADMIN | OWNER | ASSIGNED ENGINEER is allowed"
            })
        }
        
    }else if( user.userType == constant.userTypes.engineer){
        ownerId = ticket.reporter ;
        const engineerId = ticket.assignee;
 
        if(user.userId != ownerId && user.userId != engineerId){
            return res.status(403).send({
             message : "Only ADMIN | OWNER | ASSIGNED ENGINEER is allowed"
         })
        }
    }

    if(req.body.assignee != undefined && user.userType != constant.userTypes.admin){
        if(ticket.reporter != user.userId && ticket.assignee != req.body.assignee){
            return res.status(403).send({
                message : "Only ADMIN  is allowed to re-assign a ticket"
            });
        }
        
    }

    if(req.body.assignee != undefined){
        
        const engineer = await User.findOne({userId : req.body.assignee});

        if(engineer == null){
            return res.status(401).send({
                message : "Engineer userId passed as assignee is wrong"
            });
        }
    }

    next();
}