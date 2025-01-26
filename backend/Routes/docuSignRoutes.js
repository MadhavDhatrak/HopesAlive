import express from 'express';
import { createSigningUrl, handleDocuSignWebhook, createNgoSigningUrl } from '../Controllers/docuSignController.js';
import protectedRoute from '../Middleware/protected.js';

const router = express.Router();

router.post('/create-signing-url', protectedRoute, createSigningUrl);
router.post('/webhook', handleDocuSignWebhook);
router.post('/create-ngo-signing-url', protectedRoute, createNgoSigningUrl);

export default router; 