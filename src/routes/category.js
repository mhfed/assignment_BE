import { Router } from 'express';
import { create, list, read, remove, update } from '../controllers/category';
import { userById } from '../controllers/user';
import { isAdmin, isAuth, requireSignIn } from '../middleware/checkAuth';

const router = Router();

router.get("/categories", list);
router.post('/categories/:userId', requireSignIn, isAuth, isAdmin, create);
router.get('/categories/:slug', read);
router.delete("/categories/:slug", remove);
router.put("/categories/:slug", update);

router.param("userId", userById)
export default router