import asyncHandler from 'express-async-handler';
import Incident from '../Models/incidentModel.js';
import User from '../Models/userModel.js';

export const createIncident = asyncHandler(async (req, res) => {
    try {
        const user = req.user;
        const incidentData = JSON.parse(req.body.data);
        
        const ngo = await User.findOne({ 
            city: user.city, 
            role: 'ngo' 
        });

        if (!ngo) {
            return res.status(404).json({ message: "No NGO found in your city" });
        }
        
        if (!incidentData.city) {
            incidentData.city = user.city;
        }
        
        incidentData.user = user._id;
        incidentData.assignedNGO = ngo._id;
        incidentData.reporterInfo = {
            name: user.name,
            contactNumber: user.phoneNumber,
            email: user.email,
            preferredContactMethod: 'PHONE'
        };
        
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
