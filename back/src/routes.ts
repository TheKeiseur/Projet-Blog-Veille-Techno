import {Router} from "express";
import * as loginController from './controllers/loginController.js';
import {auth} from "./middlewares/auth.js";

const router: Router = Router();

router.post('/login', loginController.loginOne);
router.post('/register', loginController.registerOne);

router.get('/all', auth);

export default router;