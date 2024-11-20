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