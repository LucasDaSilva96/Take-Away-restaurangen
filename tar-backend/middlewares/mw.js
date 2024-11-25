import User from '../models/Users';
import jwt from 'jsonwebtoken';
export const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    jwt.verify(token, process.env.JWT_SECRET);

    next();
  } catch (err) {
    return res.status(401).json({
      message: 'Auth failed, Token expired. Please log back in!',
    });
  }
};

export const checkRole = async (req, res, next) => {
  try {
    // Check if Authorization header exists
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'No token provided or invalid token format',
      });
    }

    // Verify the token (instead of just decoding)
    const decoded = jwt.verify(authHeader, process.env.JWT_SECRET);

    console.log(decoded);

    if (!decoded.email) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token payload',
      });
    }

    // Find user and select only necessary fields
    const user = await User.findOne({ email: decoded.email })
      .select('email role active')
      .lean();

    // Check if user exists and is active
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found or inactive',
      });
    }

    // Check admin role
    if (user.role !== 'Admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied: Admin privileges required',
      });
    }

    // Attach user to request object for use in subsequent middleware/routes
    req.user = user;

    next();
  } catch (error) {
    // Handle different types of JWT errors
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token',
      });
    }

    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        success: false,
        message: 'Token expired',
      });
    }

    // Handle other errors
    console.error('Auth middleware error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
