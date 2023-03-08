import {Router} from "express";
import * as loginController from './controllers/loginController.js';
import * as postController from './controllers/postController.js';
import * as userController from './controllers/userController.js';
import {auth} from "./middlewares/auth.js";
import {verifyAdmin} from "./middlewares/admin.js";

const router: Router = Router();

router.post('/login', loginController.loginOne);
router.post('/register', loginController.registerOne);

// Post routes //
router.get('/post', auth, postController.getRecentPosts)
router.get('/post/:id', auth, postController.findPostById);
router.post('/post/create', auth, postController.createPost);
router.delete('/post/:id', auth, postController.deletePostById);
router.put('/post', auth, postController.updatePost);

// User routes //
router.get('/user/:id', auth, userController.getUserById);
router.delete('/user/:id', auth, verifyAdmin, userController.deleteUserById);
router.post('/user/create', auth, verifyAdmin, userController.createUser);

export default router;