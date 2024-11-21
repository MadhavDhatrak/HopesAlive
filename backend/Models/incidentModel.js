import mongoose from "mongoose";

const incidentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  animalPhoto: {
    type: String, 
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"], 
      required: true,
    },
    coordinates: {
      type: [Number], 
      required: false,
    },
    address: {
      type: String,
    },
  },
  severityAssessment: {
    type: String,
    enum: ["critical", "moderate", "minor","pending"], 
    default: "pending",
  },
  status: {
    type: String,
    enum: ["pending", "in progress", "resolved"],
    default: "pending",
  },
  assignedVolunteer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
  },
  assignedNGO: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  // Enhanced Animal Information
  animalInfo: {
    photo: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    aiSeverityAssessment: {
      score: Number,
      category: {
        type: String,
        enum: ['CRITICAL', 'HIGH', 'MODERATE', 'LOW'],
        default: 'MODERATE'
      },
      assessmentDetails: String
    }
  },

  // Enhanced Location Information
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    },
    address: {
      type: String,
      required: false
    }
  },

  // Reporter/User Contact Information
  reporterInfo: {
    name: {
      type: String,
      required: true
    },
    contactNumber: String,
    email: String,
    preferredContactMethod: {
      type: String,
      enum: ['PHONE', 'EMAIL'],
      default: 'PHONE'
    }
  },

  // Volunteer Information
  volunteerActivity: {
    assignedVolunteer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      enum: ['UNASSIGNED', 'ASSIGNED', 'ON_SITE', 'COMPLETED'],
      default: 'UNASSIGNED'
    },
    assignedAt: Date,
    lastUpdate: Date
  },

  // Case Status and Updates
  caseUpdates: [{
    timestamp: {
      type: Date,
      default: Date.now
    },
    updateType: {
      type: String,
      enum: ['STATUS_CHANGE', 'RESOURCE_UPDATE', 'VOLUNTEER_UPDATE', 'GENERAL_NOTE']
    },
    status: String,
    description: String,
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],

  // Resources Management
  resources: {
    needed: [{
      type: {
        type: String,
        enum: ['TRANSPORT', 'MEDICAL', 'SHELTER', 'FOOD', 'OTHER']
      },
      description: String,
      status: {
        type: String,
        enum: ['PENDING', 'IN_PROGRESS', 'FULFILLED'],
        default: 'PENDING'
      },
      priority: {
        type: String,
        enum: ['LOW', 'MEDIUM', 'HIGH'],
        default: 'MEDIUM'
      }
    }],
    provided: [{
      type: String,
      description: String,
      providedAt: {
        type: Date,
        default: Date.now
      },
      providedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    }]
  },

  city: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

const Incident = mongoose.model("Incident", incidentSchema);

export default Incident;
