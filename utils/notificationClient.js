const Client = require("node-rest-client").Client;

const client = new Client();

module.exports = (subject, content, recepients, requester) => {
    console.log("recepients", recepients)
    const reqBody = {
        subject: subject,
        recepientEmail: recepients,
        content: content,
        requester: requester
    }

    const reqHeader = {
        "Content-Type": "application/json"
    }

    const args = {
        data: reqBody,
        headers: reqHeader
    }

    try {
        let createURL  = process.env.BASE_URL + process.env.CREATE_TICKET;
        console.log('createURL',createURL)
        client.post(createURL, args, (data, res) => {
            console.log("Request sent");
            console.log(data);
        })
    } catch (err) {
        console.log("err.message", err.message);
    }
}