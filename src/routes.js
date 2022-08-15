const router = require('express').Router();
const AuthController = require('./controllers/AuthController');
const UserController = require('./controllers/UserController');
const CategoryController = require('./controllers/CategoryController')
const ProductController = require('./controllers/ProductController');
const SeederController = require('./controllers/SeederController');
const LeaveController = require('./controllers/LeaveController');
const NotificationController = require('./controllers/NotificationController');
const TimerController = require('./controllers/TimerController');
const AttendenceController = require('./controllers/AttendenceController');
const HolidaysController = require('./controllers/HolidaysController');
const AppraisalController = require('./controllers/AppraisalController');

const validation = require('./utils/validation');
const middleware = require('./middleware/Auth');
// const { validate } = require('./models/User');
//authController
router.route('/register').post(validation.registerValidation, AuthController.auth.register);
router.route('/login').post(validation.loginValidation, AuthController.auth.login);

router.route('/country').get(SeederController.sedeer.country);
router.route('/state').get(SeederController.sedeer.state);
router.route('/city').get(SeederController.sedeer.city);

//userController
router.route('/user').get(middleware, UserController.user.getAllUsers);
router.route('/user/:id').get(middleware, UserController.user.showOne);
router.route('/user-profile').get(middleware, UserController.user.userProfile);
router.route('/user/:id').delete(middleware, UserController.user.delete);
router.route('/user/:id').put(middleware, validation.profileUpdateValidation, UserController.user.update);
router.route('/user/profilePhotoChange').post(middleware, UserController.user.profilePhotoChange);
router.route('/change-password').post(middleware, validation.changePassword, UserController.user.changePassword);

//leave
router.route('/leave').post(validation.leaveValidation, middleware, LeaveController.leave.store);
router.route('/leave/:id').put(validation.leaveValidation, middleware, LeaveController.leave.update);
router.route('/leave/:id').delete(middleware, LeaveController.leave.delete);
router.route('/leave').get(middleware, LeaveController.leave.list);
router.route('/leave/:id').get(middleware, LeaveController.leave.showOne);

//NotificationController
router.route('/notification').post(validation.notificationValidation, middleware, NotificationController.notification.store);
router.route('/notification/:id').put(validation.notificationValidation, middleware, NotificationController.notification.update);
router.route('/notification/:id').delete(middleware, NotificationController.notification.delete);
router.route('/notification').get(middleware, NotificationController.notification.list);
router.route('/notification/:id').get(middleware, NotificationController.notification.showOne);

//timer
router.route('/timer').post(middleware, TimerController.timer.store);
router.route('/timer/:id').put(middleware, TimerController.timer.update);
router.route('/timer/:id').delete(middleware, TimerController.timer.delete);
router.route('/timer').get(middleware, TimerController.timer.list);
router.route('/timer/:id').get(middleware, TimerController.timer.showOne);
router.route('/latest-timer').get(middleware, TimerController.timer.getLatestTimer);

//attendence
router.route('/attendence').post(middleware, AttendenceController.attendence.store);
router.route('/attendence/:id').put(middleware, AttendenceController.attendence.update);
router.route('/attendence/:id').delete(middleware, AttendenceController.attendence.delete);
router.route('/attendence').get(middleware, AttendenceController.attendence.list);
router.route('/attendence/:id').get(middleware, AttendenceController.attendence.showOne);

//holidays
router.route('/holidays').post(validation.holidaysValidation, middleware, HolidaysController.holidays.store);
router.route('/holidays/:id').put(validation.holidaysValidation, middleware, HolidaysController.holidays.update);
router.route('/holidays/:id').delete(middleware, HolidaysController.holidays.delete);
router.route('/holidays').get(middleware, HolidaysController.holidays.list);
router.route('/holidays/:id').get(middleware, HolidaysController.holidays.showOne);

//appraisals
router.route('/appraisals').post(validation.appraisalsValidation, middleware, AppraisalController.appraisals.store);
router.route('/appraisals/:id').put(validation.appraisalsValidation, middleware, AppraisalController.appraisals.update);
router.route('/appraisals/:id').delete(middleware, AppraisalController.appraisals.delete);
router.route('/appraisals').get(middleware, AppraisalController.appraisals.list);
router.route('/appraisals/:id').get(middleware, AppraisalController.appraisals.showOne);

//categories
router.route('/categories').post(validation.categoryValidation, middleware, CategoryController.category.store);
router.route('/categories/:id').delete(middleware, CategoryController.category.delete);
router.route('/categories').get(CategoryController.category.list);
router.route('/categories/:id').get(CategoryController.category.showOne);

//ProductController
router.route('/product').post(validation.productValidation, middleware, ProductController.Product.store);
router.route('/product/:id').put(validation.productValidation, middleware, ProductController.Product.update);
router.route('/product/:id').delete(middleware, ProductController.Product.delete);
router.route('/product/multiple-delete').post(middleware, ProductController.Product.deleteMultiple);
router.route('/product').get(ProductController.Product.list);
router.route('/product/:id').get(ProductController.Product.showOne);

module.exports = router;