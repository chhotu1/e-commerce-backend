const router = require('express').Router();
const AuthController = require('./controllers/AuthController');
const UserController = require('./controllers/UserController');
const CategoryController = require('./controllers/CategoryController')
const ProductController = require('./controllers/ProductController');
const SeederController = require('./controllers/SeederController');
const LeaveController = require('./controllers/LeaveController');

const validation = require('./utils/validation');
const middleware = require('./middleware/Auth');
// const { validate } = require('./models/User');
//authController
router.route('/register').post(validation.registerValidation,AuthController.auth.register);
router.route('/login').post(validation.loginValidation,AuthController.auth.login);

router.route('/country').get(SeederController.sedeer.country);
router.route('/state').get(SeederController.sedeer.state);
router.route('/city').get(SeederController.sedeer.city);

//userController
router.route('/user').get(middleware,UserController.user.getAllUsers);
router.route('/user/:id').get(middleware,UserController.user.showOne);
router.route('/user-profile').get(middleware,UserController.user.userProfile);
router.route('/user/:id').delete(middleware,UserController.user.delete);
router.route('/user/:id').put(middleware,validation.profileUpdateValidation,UserController.user.update);
router.route('/user/profilePhotoChange').post(middleware,UserController.user.profilePhotoChange);
router.route('/change-password').post(middleware,validation.changePassword,UserController.user.changePassword);

//leave
router.route('/leave').post(validation.leaveValidation,middleware,LeaveController.leave.store);
router.route('/leave/:id').put(validation.leaveValidation,middleware,LeaveController.leave.update);
router.route('/leave/:id').delete(middleware,LeaveController.leave.delete);
router.route('/leave').get(LeaveController.leave.list);
router.route('/leave/:id').get(LeaveController.leave.showOne);

//categories
router.route('/categories').post(validation.categoryValidation,middleware,CategoryController.category.store);
router.route('/categories/:id').delete(middleware,CategoryController.category.delete);
router.route('/categories').get(CategoryController.category.list);
router.route('/categories/:id').get(CategoryController.category.showOne);

//ProductController
router.route('/product').post(validation.productValidation,middleware,ProductController.Product.store);
router.route('/product/:id').put(validation.productValidation,middleware,ProductController.Product.update);
router.route('/product/:id').delete(middleware,ProductController.Product.delete);
router.route('/product/multiple-delete').post(middleware,ProductController.Product.deleteMultiple);
router.route('/product').get(ProductController.Product.list);
router.route('/product/:id').get(ProductController.Product.showOne);

module.exports = router;