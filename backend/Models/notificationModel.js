import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['NEW_CASE', 'CASE_UPDATE', 'VOLUNTEER_ASSIGNED', 'RESOURCE_REQUEST'],
        required: true
    },
    message: {
        type: String,
        required: true   
    },
    incident: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Incident'
    },
    isRead: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;