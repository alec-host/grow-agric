const { param } = require("express-validator");


module.exports = app => {

    const auth = require("../middleware/auth");
    const userControllers = require("../controllers/user.controller");
    const addFarmController = require("../controllers/farm.controller");
    const addFinanceController = require("../controllers/finance.controller");
    const addFarmChallengeController = require("../controllers/farm.challenges.controller");
    const addPreferredFarmSuppliesController = require("../controllers/preferred.farm.supplies.controller");

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

    //-.farms.
    router.post('/addFarm',validators.farmValidator,addFarmController.AddFarm);
    //-.farm challenges.
    router.post('/add',validators.farmChallengeValidator,addFarmChallengeController.AddFarmChallenge);
    //-.finance.
    router.post('/addFinance',validators.financeValidator,addFinanceController.AddFinance);
    //-.preferred farm supplies.
    router.post('/AddFarmSupplies',validators.preferredFarmValidator,addPreferredFarmSuppliesController.AddFarmSupplies);

    router.get('/welcome',auth,userControllers.welcome);

    router.get('/',userControllers.findAndCountAll);
    router.get('/all/:search',userControllers.findAll);

    app.use("/api/v1/users",router);

    app.use(userControllers.errorHandler);
};