import asyncHandler from 'express-async-handler';
import Incident from '../Models/incidentModel.js';
import User from '../Models/userModel.js';

export const createIncident = asyncHandler(async (req, res) => {
    try {
        const user = req.user;
        const incidentData = JSON.parse(req.body.data);
        
        // Find an NGO in the same city
        const ngo = await User.findOne({ 
            city: user.city, 
            role: 'ngo' 
        });
        
        console.log('Found NGO:', {
            id: ngo?._id,
            city: ngo?.city,
            role: ngo?.role
        });
        
        if (!ngo) {
            return res.status(404).json({ message: "No NGO found in your city" });
        }

        // Prepare the complete incident data
        const completeIncidentData = {
            // Basic fields
            user: user._id,  // Required: user reference
            city: user.city,
            assignedNGO: ngo._id,
            description: incidentData.description,

            // Reporter info
            reporterInfo: {
                name: user.name,
                contactNumber: user.phoneNumber,
                email: user.email,
                preferredContactMethod: 'PHONE'
            },

            // Location
            location: {
                type: "Point",
                coordinates: incidentData.location.coordinates,
                address: incidentData.location.address
            },

            // Status and severity
            status: "pending",
            severityAssessment: "pending",

            // Animal info
            animalInfo: {
                description: incidentData.animalInfo.description,
                photo: req.file ? req.file.filename : null,
                aiSeverityAssessment: {
                    score: incidentData.animalInfo.aiSeverityAssessment.score,
                    category: incidentData.animalInfo.aiSeverityAssessment.category,
                    assessmentDetails: incidentData.animalInfo.aiSeverityAssessment.assessmentDetails || ''
                }
            },
            animalPhoto: req.file ? req.file.filename : null
        };

        // Validate required photo
        if (!req.file) {
            return res.status(400).json({ message: "Animal photo is required" });
        }

        console.log('Creating incident with data:', completeIncidentData);

        const incident = await Incident.create(completeIncidentData);
        res.status(201).json(incident);
    } catch (error) {
        console.error('Error creating incident:', error);
        res.status(400).json({ message: error.message });
    }
});
export const getIncidents = asyncHandler(async (req, res) => {
    try {
        const userCity = req.user.city;
        
        const incidents = await Incident.find({ city: userCity })
            .populate('user', 'name email')
            .populate('assignedVolunteer', 'name email')
            .populate('assignedNGO', 'name email')
            .sort({ createdAt: -1 });
        res.json(incidents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export const getIncidentById = asyncHandler(async (req, res) => {
    try {
        const userCity = req.user.city;
        const incident = await Incident.findOne({
            _id: req.params.id,
            city: userCity
        })
            .populate('user', 'name email')
            .populate('assignedVolunteer', 'name email')
            .populate('assignedNGO', 'name email');
            
        if (!incident) {
            return res.status(404).json({ message: "Incident not found or not accessible in your city" });
        }
        res.json(incident);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
