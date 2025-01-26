import express from 'express';
import { getPets, createPet, getPetDetails } from '../Controllers/petController.js';
import upload from '../middleware/uploadMiddleware.js';
import protectedRoute from '../middleware/protected.js';

const router = express.Router();

router.get('/', getPets);
router.get('/:id', getPetDetails);
router.post('/', protectedRoute, upload.array('photos', 5), createPet);

export default router; 