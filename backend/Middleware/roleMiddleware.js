// Middleware to check if user has NGO role
export const requireNGORole = async (req, res, next) => {
    try {
        // Check if user exists and has role property
        if (!req.user || !req.user.role) {
            return res.status(403).json({ 
                message: "Access denied. No role specified." 
            });
        }

        // Check if user has NGO role
        if (req.user.role !== 'ngo') {
            return res.status(403).json({ 
                message: "Access denied. NGO role required." 
            });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




// Middleware to check if user has Volunteer role
export const requireVolunteerRole = async (req, res, next) => {
    try {
        // Check if user exists and has role property
        if (!req.user || !req.user.role) {
            return res.status(403).json({ 
                message: "Access denied. No role specified." 
            });
        }

        // Check if user has volunteer role
        if (req.user.role !== 'volunteer') {
            return res.status(403).json({ 
                message: "Access denied. Volunteer role required." 
            });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};