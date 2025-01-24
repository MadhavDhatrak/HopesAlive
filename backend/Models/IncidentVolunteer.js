import mongoose from 'mongoose';

const incidentVolunteerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    city: {
        type: String,
        required: true
    },
    location: {
        type: {
            type: String,
            default: 'Point'
        },
        coordinates: [Number],
        address: String
    },
    animalInfo: {
        description: String,
        photo: String,
        aiSeverityAssessment: {
            score: Number,
            category: String,
            assessmentDetails: String
        }
    },
    status: {
        type: String,
        enum: ['pending', 'assigned', 'in-progress', 'completed'],
        default: 'pending'
    },
    description: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const IncidentVolunteer = mongoose.model('IncidentVolunteer', incidentVolunteerSchema);
export default IncidentVolunteer;