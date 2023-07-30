const { param } = require("express-validator");


module.exports = app => {

    const auth = require("../middleware/auth");
    const userControllers = require("../controllers/user.controller");
    const farmControllers = require("../controllers/farm.controller");
    const financeControllers = require("../controllers/finance.controller");
    const farmChallengeControllers = require("../controllers/farm.challenges.controller");
    const preferredFarmSuppliesControllers = require("../controllers/preferred.farm.supplies.controller");
    const hearAboutUsControllers = require("../controllers/hear.about.us.controller");
    const notificationControllers = require("../controllers/push.notification.controller");

    const router = require("express").Router();
    const validators = require("../validators");

    //-.farmers.
    router.post('/register',validators.registrationValidator,userControllers.registerUser);
    router.post('/login',validators.loginValidator,userControllers.loginUser);
    router.post('/logout',userControllers.logoutUser);
    router.post('/token',validators.tokeValidator,userControllers.token);
    router.put('/modify/:reference_id',userControllers.modifyUser);
    router.post('/verifyPhoneNumber',validators.verifyPhoneNumberValidator,userControllers.verifyByPhoneNumber);
    router.post('/changePassword',validators.changePasswordValidator,userControllers.changePassword);
    router.get('/otp/:phoneNumber',param('phoneNumber'),validators.newOTPValidator,userControllers.newOTP);
    router.get('/accountState/:phoneNumber',param('phoneNumber'),validators.accountVerificationValidator,userControllers.accountStatus);
    router.get('/profile/:phoneNumber',param('phoneNumber'),userControllers.getUserProfile);
    router.put('/fcm/:reference_id',userControllers.updateUserFCM);
    router.post('/fcmService',notificationControllers.sendPushNotification);

    //-.farms.
    router.post('/addFarm',validators.farmValidator,farmControllers.AddFarm);
    //-.farm challenges.
    router.post('/addChallenge',validators.farmChallengeValidator,farmChallengeControllers.AddFarmChallenge);
    //-.finance.
    router.post('/addFinance',validators.financeValidator,financeControllers.AddFinance);
    //-.preferred farm supplies.
    router.post('/AddFarmSupplies',validators.preferredFarmValidator,preferredFarmSuppliesControllers.AddFarmSupplies);

    router.get('/welcome',auth,userControllers.welcome);
    router.get('/ping',userControllers.ping);

    router.get('/',userControllers.findAndCountAll);
    router.get('/all/:search',userControllers.findAll);
    router.post('/hearAboutUs',hearAboutUsControllers.hearAboutUs);
    router.get('/fieldAgentUserList',userControllers.getUserSpecificData);
    router.get('/fieldAgentFarmList',farmControllers.getFarmSpecificData);

    app.use("/api/v1/users",router);
    
    app.use(userControllers.errorHandler);
};