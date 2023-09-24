import { Router } from 'express';
import { professional, status } from '../controllers/index.js';
const router = Router();

// get status
router.get('/', status);

// profession
router.get('/professional', professional.read);
router.post('/professional', professional.create);
router.put('/professional/:id', professional.update);
router.delete('/professional/:id', professional.delete)

export { router };