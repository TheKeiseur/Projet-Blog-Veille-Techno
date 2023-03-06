import {Router} from "express";
import * as userController from '../src/controllers/userController.js';

const router: Router = Router();

router.post('/login', userController.loginOne);
router.post('/register', userController.registerOne);

export default router;