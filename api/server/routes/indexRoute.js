import express from 'express';
import contactRoutes from "./contactRoute";
import authRoutes from "./authRoutes";
import authCheck from '../middleware/authCheck'

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/contacts', contactRoutes);

export default router;