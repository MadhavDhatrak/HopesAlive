import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    recipient_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recipient_type: {
        type: String,
        enum: ['volunteer', 'ngo'],
        required: true
    },
    message: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    read: {
        type: Boolean,
        default: false
    }
});

const NotificationVolunteer=mongoose.model("NotificationVolunteer",notificationSchema)

export default NotificationVolunteer;