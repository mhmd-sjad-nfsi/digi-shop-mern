import express from 'express';
import { addOrderItems } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';
import { getOrderById } from '../controllers/orderController.js'; // ✨


const router = express.Router();

router.route('/').post(protect, addOrderItems);
router.route('/:id').get(protect, getOrderById); // ✨


export default router;