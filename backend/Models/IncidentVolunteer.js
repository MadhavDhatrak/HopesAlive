import mongoose from 'mongoose';

const incidentSchema = new mongoose.Schema({
    animal_photo: String,
    animal_description: String,
    location: {
        type: { type: String },
        coordinates: [Number],
        address: String
    },
    severity: {
        type: String,
        enum: ['Low', 'Medium', 'High']
    },
    required_actions: [String],
    volunteer_status: {
        type: String,
        enum: ['On the way', 'Arrived', 'Animal rescued', 'Completed']
    },
    volunteer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    last_updated: Date,
    created_at: {
        type: Date,
        default: Date.now
    }
});


const IncidentVolunteer=mongoose.model("IncidentVolunteer",incidentSchema)
 export default IncidentVolunteer;