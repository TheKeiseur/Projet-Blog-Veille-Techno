import {Router} from "express";
import * as loginController from './controllers/loginController.js';
import * as postController from './controllers/postController.js';
import * as userController from './controllers/userController.js';
import {auth} from "./middlewares/auth.js";
import {verifyAdmin} from "./middlewares/admin.js";

const router: Router = Router();

router.post('/login', loginController.loginOne);

// Post routes //
router.get('/posts', auth, postController.getRecentPosts);
router.get('/post/:id', auth, postController.findPostById);
router.post('/post/create', auth, postController.createPost);
router.delete('/post/:id', auth, postController.deletePostById);
router.put('/post', auth, postController.updatePost);
router.put('/post/like', auth, postController.likeOrDislike);

// User routes //
router.get('/user/:id', auth, userController.getUserById);
router.delete('/user/:id', auth, verifyAdmin, userController.deleteUserById);
router.put('/user', auth, userController.updateUser);
router.post('/user/create', auth, verifyAdmin, userController.createUser);
router.get('/user/favored-posts/posts', auth, userController.getFavoredPosts);
router.post('/user/favored-posts/posts', auth, userController.addToFavoredPosts);

export default router;