// import Incident from '../models/Incident.js';  // You'll need to create/import these models
// import Notification from '../Models/Notification.js';

import Incident from '../models/Incident.js';
import Notification from '../models/Notification.js';
import User from '../Models/userModel.js';
// Get incident details for volunteer
export const getIncidentDetails = async (req, res) => {
    try {
        const { incident_id } = req.params;
        const volunteerCity = req.user.city;
        
        const incident = await Incident.findOne({
            _id: incident_id,
            city: volunteerCity
        });

        if (!incident) {
            return res.status(404).json({ message: "Incident not found or not accessible in your city" });
        }

        // Return information matching your incident model structure
        const volunteerView = {
            animal_info: {
                photo: incident.animalInfo.photo,
                description: incident.animalInfo.description,
                severity: incident.animalInfo.aiSeverityAssessment
            },
            incident_location: incident.location,
            status: incident.status,
            severity_assessment: incident.severityAssessment,
            description: incident.description
        };

        res.status(200).json(volunteerView);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update volunteer status for an incident
export const updateVolunteerStatus = async (req, res) => {
    try {
        const incidentId = req.params.incident_id;
        const volunteerId = req.user._id;

        // First fetch the volunteer details
        const volunteer = await User.findById(volunteerId).select('name phoneNumber email');

        const updatedIncident = await Incident.findByIdAndUpdate(
            incidentId,
            {
                $set: {
                    'volunteerActivity.assignedVolunteer': volunteerId,
                    'volunteerActivity.status': 'ASSIGNED',
                    'volunteerActivity.assignedAt': new Date(),
                    'volunteerActivity.lastUpdate': new Date(),
                    'status': 'in progress' // Update main incident status
                }
            },
            { new: true }
        ).populate('volunteerActivity.assignedVolunteer', 'name phoneNumber email');

        if (!updatedIncident) {
            return res.status(404).json({ message: 'Incident not found' });
        }

        // Add a case update
        updatedIncident.caseUpdates.push({
            timestamp: new Date(),
            updateType: 'VOLUNTEER_UPDATE',
            description: `Volunteer ${volunteer.name} assigned to the incident`,
            updatedBy: volunteerId
        });

        await updatedIncident.save();

        // Debug logging
        console.log('Updated incident with volunteer:', {
            id: updatedIncident._id,
            volunteerName: updatedIncident.volunteerActivity?.assignedVolunteer?.name,
            status: updatedIncident.volunteerActivity?.status
        });

        res.json({ 
            message: 'Status updated successfully',
            incident: updatedIncident
        });
    } catch (error) {
        console.error('Error updating volunteer status:', error);
        res.status(500).json({ message: error.message });
    }
};

// Helper function to map status values
function mapVolunteerStatus(status) {
    const statusMap = {
        'On the way': 'ASSIGNED',
        'Arrived': 'ON_SITE',
        'Animal rescued': 'ON_SITE',
        'Completed': 'COMPLETED'
    };
    return statusMap[status] || 'UNASSIGNED';
}

// Get notifications for volunteer
export const getVolunteerNotifications = async (req, res) => {
    try {
        const volunteer_id = req.user._id;  // Changed from req.user.id to req.user._id

        console.log("Searching notifications for volunteer:", volunteer_id); // Debug log

        const notifications = await Notification.find({
            recipient: volunteer_id  // Changed from recipient_id to recipient
        })
        .sort({ createdAt: -1 })  // Most recent first
        .limit(20);  // Limit to last 20 notifications

        console.log("Found notifications:", notifications); // Debug log

        res.status(200).json(notifications);
    } catch (error) {
        console.log("Error fetching notifications:", error); // Debug log
        res.status(500).json({ message: error.message });
    }
};

export const getVolunteerIncidents = async (req, res) => {
    try {
        const volunteerCity = req.user.city;
        
        // Find all unassigned incidents in volunteer's city
        const incidents = await Incident.find({ 
            city: volunteerCity,
            status: "pending",
            'volunteerActivity.assignedVolunteer': { $exists: false }
        })
        .select('animalInfo location status createdAt description user')
        .populate('user', 'name phoneNumber')
        .populate('assignedNGO', 'name phoneNumber')
        .sort('-createdAt');

        console.log('Volunteer Dashboard Query:', {
            city: volunteerCity,
            foundIncidents: incidents.length
        });

        res.json({
            success: true,
            count: incidents.length,
            debug: {
                volunteerId: req.user._id,
                volunteerCity: volunteerCity,
                totalIncidents: incidents.length
            },
            data: incidents.map(incident => ({
                id: incident._id,
                location: incident.location,
                animalInfo: {
                    description: incident.animalInfo.description,
                    photo: incident.animalInfo.photo,
                    severity: incident.animalInfo.aiSeverityAssessment
                },
                status: incident.status,
                createdAt: incident.createdAt,
                assignedNGO: incident.assignedNGO
            }))
        });
    } catch (error) {
        console.error('Error in getVolunteerIncidents:', error);
        res.status(500).json({ message: error.message });
    }
};

