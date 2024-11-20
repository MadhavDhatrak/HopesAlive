import User from "../Models/userModel.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/gererateToken.js";
import jwt from "jsonwebtoken";

// Register Controller
export const register = async (req, res) => {
  try {
    const { name, email, password, role, phoneNumber, address, volunteerDetails, ngoDetails } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user based on role
    const userData = {
      name,
      email,
      password: hashedPassword,
      role,
      phoneNumber,
      address,
    };

    // Add role-specific details
    if (role === "volunteer" && volunteerDetails) {
      userData.volunteerDetails = volunteerDetails;
    } else if (role === "NGO" && ngoDetails) {
      userData.ngoDetails = ngoDetails;
    } else if (role !== "user") {
      return res.status(400).json({ message: "Invalid role specified" });
    }

    const user = await User.create(userData);

    if (user) {
      // Generate JWT and set cookie
      generateToken(user._id, res);

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Login Controller
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_KEY,
            { expiresIn: '15d' }
        );

        // Return user data and token
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: token  // This is your Bearer token
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Logout Controller
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
      httpOnly: true,
    });
    
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Get User Profile Controller
export const getUserProfile = async (req, res) => {
    try {
      const { userId } = req.params;
      console.log(userId);
  
      const user = await User.findById(userId).select('-password');
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Prepare response based on user role
      const userResponse = {
        name: user.name,
        contact_info: {
          email: user.email,
          phoneNumber: user.phoneNumber,
          address: user.address
        },
        role: user.role
      };
  
      // Add role-specific details if they exist
      if (user.role === 'volunteer' && user.volunteerDetails) {
        userResponse.volunteerDetails = user.volunteerDetails;
      } else if (user.role === 'NGO' && user.ngoDetails) {
        userResponse.ngoDetails = user.ngoDetails;
      }
  
      res.json(userResponse);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };