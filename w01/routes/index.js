import { Router } from 'express';
import { getName, status } from '../controllers/index.js';
const router = Router();

// home page
router.get('/', getName);

// status
router.get('/status', status);

export { router };