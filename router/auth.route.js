const authController  = require("../controller/auth");
const { verifyReqBody } = require("../middleware")

module.exports = (app) => {
    app.post(
        "/crm/api/v1/auth/signup", 
        [verifyReqBody.validateSignUpRequestBody], 
        authController.signup
    );
    
    app.post(
        "/crm/api/v1/auth/signin", 
        [verifyReqBody.validateSignInRequestBody], 
        authController.signin
    );
}