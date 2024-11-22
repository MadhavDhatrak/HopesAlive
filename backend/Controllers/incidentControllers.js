import asyncHandler from 'express-async-handler';
import Incident from '../Models/incidentModel.js';
import User from '../Models/userModel.js';

export const createIncident = asyncHandler(async (req, res) => {
    try {
        const user = req.user;
        const incidentData = JSON.parse(req.body.data);
        
        // Find an available NGO in the same city with load balancing
        const ngo = await User.aggregate([
            { 
                $match: { 
                    city: user.city, 
                    role: 'ngo',
                    isActive: true 
                }
            },
            {
                $lookup: {
                    from: 'incidents',
                    localField: '_id',
                    foreignField: 'assignedNGO',
                    as: 'assignedIncidents'
                }
            },
            {
                $addFields: {
                    incidentCount: { $size: '$assignedIncidents' }
                }
            },
            { $sort: { incidentCount: 1 }},  // Sort by least number of incidents
            { $limit: 1 }
        ]);
        
        if (!ngo || ngo.length === 0) {
            return res.status(404).json({ message: "No NGO found in your city" });
        }

        const selectedNGO = ngo[0];  // Get the first NGO from aggregation result

        // Prepare the complete incident data
        const completeIncidentData = {
            // Basic fields
            user: user._id,
            city: user.city,
            assignedNGO: selectedNGO._id,  // Dynamically assigned NGO
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

        console.log('Creating incident with assignment to NGO:', {
            ngoId: selectedNGO._id,
            city: user.city
        });

        const incident = await Incident.create(completeIncidentData);
        
        console.log('Created incident:', {
            id: incident._id,
            city: incident.city,
            assignedNGO: incident.assignedNGO
        });

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
