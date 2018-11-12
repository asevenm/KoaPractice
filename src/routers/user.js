const router = require('koa-router')();
const userController = require('../controllers/user');

router.post('/register', userController.register);
router.post('/signIn', userController.signIn);
router.post('/signUp', userController.signUp);

router.get('/users', userController.getUserList);
router.get('/delAll', userController.delAllUser);
module.exports = router;