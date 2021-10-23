import express from 'express';
import controller from '../controllers/hello';

const router = express.Router();

router.post('/create/hello', controller.createMainData);
router.get("/get/hello", controller.getMainData);

export default router;