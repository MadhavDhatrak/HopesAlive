import Incident from '../Models/incidentModel.js';
import Notification from '../Models/notificationModel.js';

// Get NGO Dashboard Overview
export const getDashboardOverview = async (req, res) => {
    try {
        const ngoId = req.user._id;
        const ngoCity = req.user.city;

        // First, find all incidents in the city
        const allCityIncidents = await Incident.find({ 
            city: ngoCity 
        });
        
        // Then find incidents assigned to this NGO
        const ngoIncidents = await Incident.find({ 
            city: ngoCity,
            assignedNGO: ngoId
        });

        // Calculate statistics
        const stats = {
            total: ngoIncidents.length,
            critical: ngoIncidents.filter(inc => 
                inc.animalInfo?.aiSeverityAssessment?.category === 'HIGH'
            ).length,
            pending: ngoIncidents.filter(inc => inc.status === 'pending').length,
            inProgress: ngoIncidents.filter(inc => inc.status === 'in progress').length,
            resolved: ngoIncidents.filter(inc => inc.status === 'resolved').length
        };

        // Get 5 most recent incidents with volunteer information
        const recentIncidents = await Incident.find({ 
            city: ngoCity,
            assignedNGO: ngoId
        })
        .select('animalInfo location status createdAt volunteerActivity')
        .populate('volunteerActivity.assignedVolunteer', 'name phoneNumber')
        .sort('-createdAt')
        .limit(5);

        // Enhanced debug information
        console.log('Dashboard Overview Debug:', {
            ngoId,
            ngoCity,
            totalCityIncidents: allCityIncidents.length,
            ngoAssignedIncidents: ngoIncidents.length,
            sampleIncident: allCityIncidents[0] ? {
                id: allCityIncidents[0]._id,
                city: allCityIncidents[0].city,
                assignedNGO: allCityIncidents[0].assignedNGO
            } : null
        });

        res.json({
            stats,
            recentIncidents,
            debug: {
                ngoId,
                ngoCity,
                totalCityIncidents: allCityIncidents.length,
                ngoAssignedIncidents: ngoIncidents.length,
                sampleIncidentAssignment: allCityIncidents[0] ? {
                    id: allCityIncidents[0]._id,
                    city: allCityIncidents[0].city,
                    assignedNGO: allCityIncidents[0].assignedNGO,
                    volunteerInfo: allCityIncidents[0].volunteerActivity
                } : null
            }
        });
    } catch (error) {
        console.error('Error in getDashboardOverview:', error);
        res.status(500).json({ message: error.message });
    }
};

// Get All Incidents for NGO
export const getAllIncidents = async (req, res) => {
    try {
        const ngoId = req.user._id;
        const ngoCity = req.user.city;
        
        const incidents = await Incident.find({ 
            city: ngoCity
        })
        .select('animalInfo location status createdAt assignedNGO user volunteerActivity')
        .populate('user', 'name email phoneNumber')
        .populate('volunteerActivity.assignedVolunteer', 'name phoneNumber email')
        .sort('-createdAt');

        // Add debug logging
        console.log('Incidents with volunteer info:', incidents.map(inc => ({
            id: inc._id,
            volunteerInfo: inc.volunteerActivity,
            volunteerName: inc.volunteerActivity?.assignedVolunteer?.name
        })));

        res.json({
            success: true,
            count: incidents.length,
            data: incidents
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: error.message });
    }
};

// Get Detailed Incident Information
export const getDetailedIncident = async (req, res) => {
    try {
        const ngoCity = req.user.city;
        const incident = await Incident.findOne({
            _id: req.params.incident_id,
            city: ngoCity  // Add city filter
        })
            .populate('user', 'name email phoneNumber')
            .populate('volunteerActivity.assignedVolunteer', 'name phoneNumber email')
            .populate('caseUpdates.updatedBy', 'name')
            .populate('resources.provided.providedBy', 'name');

        if (!incident) {
            return res.status(404).json({ message: 'Incident not found or not accessible in your city' });
        }

        const response = {
            animal_info: {
                photo: incident.animalInfo.photo,
                description: incident.animalInfo.description,
                severity: incident.animalInfo.aiSeverityAssessment
            },
            user_contact_info: incident.user,
            volunteer_info: incident.volunteerActivity,
            status_updates: incident.caseUpdates,
            resources_needed: incident.resources.needed,
            location: incident.location
        };

        res.json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Incident Status
export const updateIncidentStatus = async (req, res) => {
    try {
        const { incident_id } = req.params;
        const { status, status_update, resources_needed, resources_provided } = req.body;

        const incident = await Incident.findById(incident_id);
        if (!incident) {
            return res.status(404).json({ message: "Incident not found" });
        }

        // Update the main status
        incident.status = status;

        // Add the case update
        incident.caseUpdates.push({
            timestamp: new Date(),
            updateType: "STATUS_CHANGE",
            description: status_update,
            updatedBy: req.user._id
        });

        // Update resources if provided
        if (resources_needed && resources_needed.length > 0) {
            incident.resources.needed = resources_needed;
        }
        if (resources_provided && resources_provided.length > 0) {
            incident.resources.provided = resources_provided;
        }

        const updatedIncident = await incident.save();

        res.json({
            success: true,
            message: "Incident updated successfully",
            data: updatedIncident
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get NGO Notifications
export const getNotifications = async (req, res) => {
    try {
        const ngoId = req.user._id;
        
        const notifications = await Notification.find({
            recipient: ngoId,
            isRead: false
        })
        .sort('-createdAt')
        .populate('incident', 'animalInfo.description location')
        .limit(50);

        res.json({
            success: true,
            count: notifications.length,
            data: notifications
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

