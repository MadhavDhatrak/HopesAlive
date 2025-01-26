import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["user", "volunteer", "ngo"],
    default: "user",
    set: function(val) {
        return val.toLowerCase();
    }
  },

  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  
  volunteerDetails: {
    availability: {
      type: String,
      enum: ["weekdays", "weekends", "both"],
      required: function() { return this.role === "volunteer"; }
    },
    skills: [{
      type: String
    }],
    experience: {
      type: String
    }
  },
  // Specific fields for NGOs
  ngoDetails: {
    registrationNumber: {
      type: String,
      required: function() { return this.role === "ngo"; }
    },
    organizationType: {
      type: String
    },
    operatingAreas: [{
      type: String
    }],
    documentsSigned: {
      type: Boolean,
      default: false
    },
    documentSignedAt: {
      type: Date
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  notifications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Notification'
  }],
  city: {
    type: String,
    required: true,
    trim: true
  }
});

const User = mongoose.model("User", userSchema);
export default User;


