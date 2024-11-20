import asyncHandler from 'express-async-handler';
import Incident from '../Models/incidentModel.js';

export const createIncident = asyncHandler(async (req, res) => {
    try {
        // Get the logged-in user
        const user = req.user;
        
        // Parse the JSON data from the form
        const incidentData = JSON.parse(req.body.data);
        
        // Automatically add user info
        incidentData.user = user._id;
        incidentData.assignedNGO = user._id;  // Since the user is an NGO
        incidentData.reporterInfo = {
            name: user.name,
            contactNumber: user.phoneNumber,
            email: user.email,
            preferredContactMethod: 'PHONE'
        };
        
        // Add the uploaded photo path
        if (req.file) {
            incidentData.animalPhoto = req.file.filename;
            incidentData.animalInfo.photo = req.file.filename;
        }

        const incident = await Incident.create(incidentData);
        res.status(201).json(incident);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export const getIncidents = asyncHandler(async (req, res) => {
    try {
        const incidents = await Incident.find({})
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
        const incident = await Incident.findById(req.params.id)
            .populate('user', 'name email')
            .populate('assignedVolunteer', 'name email')
            .populate('assignedNGO', 'name email');
        res.json(incident);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
