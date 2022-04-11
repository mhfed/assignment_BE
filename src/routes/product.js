import { Router } from 'express';
import { create, get, list, remove, update } from '../controllers/product';
import { userById } from '../controllers/user';
import { checkAuth, isAdmin, isAuth, requireSignIn } from '../middleware/checkAuth';

const router = Router();

router.get("/products", list);
router.get("/products/:id", get);
router.post('/products/:userId', requireSignIn, isAuth, isAdmin, create);
router.delete("/products/:id/:userId", requireSignIn, isAuth, isAdmin, remove);
router.put("/products/:id/:userId", requireSignIn, isAuth, isAdmin, update);

router.param("userId", userById);

export default router