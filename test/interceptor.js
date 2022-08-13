const req = require("express/lib/request")

module.exports = {
    mockRequest: () => {
        let req = {};

        req.body = jest.fn().mockReturnValue(req)
        req.params = jest.fn().mockReturnValue(req)
        req.query = jest.fn().mockReturnValue(req)
        
        return req;
    },

    mockResponse: () => {
        let res = {};

        res.status = jest.fn().mockReturnValue(res)
        res.send = jest.fn().mockReturnValue(res)
        
        return res;
    }
}