

module.exports = app => {

    const auth = require("../middleware/auth");
    const userControllers = require("../controllers/user.controller");
    const addFarmController = require("../controllers/farm.controller");
    const router = require("express").Router();
    const validators = require("../validators");

    //-.farmers.
    router.post('/register',validators.registrationValidator,userControllers.registerUser);
    router.post('/login',validators.loginValidator,userControllers.loginUser);
    router.post('/logout',userControllers.logoutUser);
    router.post('/token',validators.tokeValidator,userControllers.token);
    router.put('/modify/:reference_id',userControllers.modifyUser);
    router.post('/verifyPhoneNumber',validators.verifyPhoneNumberValidator,userControllers.verifyByPhoneNumber);
    router.get('/otp/:phoneNumber',validators.newOTPValidator,userControllers.newOTP);
    router.post('/changePassword',validators.changePasswordValidator,userControllers.changePassword);

    //-.farms.
    router.post('/addFarm',validators.farmValidator,addFarmController.AddFarm);

    router.get('/welcome',auth,userControllers.welcome);

    router.get('/:reference_id',userControllers.findOne);
    router.get('/',userControllers.findAndCountAll);
    router.get('/all/:search',userControllers.findAll);

    app.use("/api/v1/users",router);

    app.use(userControllers.errorHandler);
};