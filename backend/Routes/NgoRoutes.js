import express from 'express';
import { 
    getAllIncidents,
    getDetailedIncident,
    updateIncidentStatus,
    getNotifications,
    getDashboardOverview
} from '../Controllers/NgoDashBoard.js';
import protectedRoute from "../Middleware/protected.js";
import { requireNGORole } from "../Middleware/roleMiddleware.js";
import { getNgoProfile } from '../Controllers/NgoDashBoard.js';

const router = express.Router();

// Protect all routes and require NGO role
router.use(protectedRoute);
router.use(requireNGORole);

// Dashboard routes
router.get('/incidents', getAllIncidents); //
router.get('/incidents/:incident_id', getDetailedIncident); //
router.put('/incidents/:incident_id/update', updateIncidentStatus);
router.get('/notifications', getNotifications);
router.get('/overview', getDashboardOverview); //
router.get('/profile', getNgoProfile);


export default router;