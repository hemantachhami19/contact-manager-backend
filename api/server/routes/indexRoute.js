import express from 'express';
import contactRoutes from "./ContactRoute";
import authRoutes from "./auth-routes";
const router = express.Router();
const app = express();

app.use('/contacts', contactRoutes);

// set up routes
app.use('/auth', authRoutes);

export default router;