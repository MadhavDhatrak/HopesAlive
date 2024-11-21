import express from 'express';
import protectedRoute from '../Middleware/protected.js';
import { requireVolunteerRole } from '../Middleware/roleMiddleware.js';
import {
    getIncidentDetails,
    updateVolunteerStatus,
    getVolunteerNotifications
} from '../controllers/volunteerController.js';

const router = express.Router();

// Volunteer dashboard routes
router.get('/incidents/:incident_id', protectedRoute, getIncidentDetails);
router.post('/incidents/:incident_id/volunteer/update',protectedRoute, updateVolunteerStatus);
router.get('/notifications', protectedRoute, getVolunteerNotifications);

export default router;