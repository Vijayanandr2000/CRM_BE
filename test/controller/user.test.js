const {findAllUser,findUserById}  = require('../../controller/user');
const User = require('../../model/user.model');

const {mockRequest, mockResponse} = require("../interceptor");


const userTestPayload = {
    name: "Test",
    userId : "Test01",
    email : "test@gmail.com",
    userType : "CUSTOMER",
    userStatus : "APPROVED",
    ticketsCreated : [],
    ticketsAssigned : []   
}


describe("test findAllUser function", () => {

    it("Check with empty request", async()=>{

        const userSpy = jest.spyOn(User, "find").mockReturnValue(Promise.resolve([userTestPayload]));

        const req = mockRequest();
        const res = mockResponse();

        await findAllUser(req, res);


        // I need to verify that userSpy was called in the execution
        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.objectContaining({
                    name : "Test"
                })
            ])
        )
    }),

    it("Check with query request", async()=>{

        const userSpy = jest.spyOn(User, "find").mockReturnValue(Promise.resolve([userTestPayload]));

        const req = mockRequest();
        const res = mockResponse();

        req.query = {userStatus: "APPROVEDs"}

        await findAllUser(req, res);


        // I need to verify that userSpy was called in the execution
        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.objectContaining({
                    userStatus : "APPROVED"
                })
            ])
        )
    }),

    it("error while calling the User.find method" , async ()=>{

        const userSpy = jest.spyOn(User, 'find').mockReturnValue(Promise.reject(new Error("error")));
        
        //Mock req and res objects as well
        const req = mockRequest();
        const res = mockResponse();
        req.query = {userStatus : "APPROVED"};

        await findAllUser(req, res);

        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            errorMessage: "error",
            message: "Internal server error"
        });


    })
})

describe("test findUserById function", () => {

    it("Check with empty request", async()=>{

        const userSpy = jest.spyOn(User, "find").mockReturnValue(Promise.resolve([userTestPayload]));

        const req = mockRequest();
        const res = mockResponse();

        await findUserById(req, res);


        // I need to verify that userSpy was called in the execution
        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.objectContaining({
                    userId : "Test01",
                })
            ])
        )
    }),

    it("Check with query request", async()=>{

        const userSpy = jest.spyOn(User, "find").mockReturnValue(Promise.resolve([userTestPayload]));

        const req = mockRequest();
        const res = mockResponse();

        req.params = {userId : "Test01"}

        await findUserById(req, res);


        // I need to verify that userSpy was called in the execution
        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.objectContaining({
                    userId : "Test01"
                })
            ])
        )
    }),

    it("error while calling the User.find method" , async ()=>{

        const userSpy = jest.spyOn(User, 'find').mockReturnValue(Promise.reject(new Error("error")));
        
        //Mock req and res objects as well
        const req = mockRequest();
        const res = mockResponse();

        await findUserById(req, res);

        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            errorMessage: "error",
            message: "Internal server error"
        });


    })
})
