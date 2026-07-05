
import jwt from 'jsonwebtoken'

const authmiddleware = (req, res, next) => {
  // 1. Get the token from the request header
  // Standard format: "Authorization: Bearer <token>"
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];

  // 2. Check if token doesn't exist
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // 3. Verify token using your environment's secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 4. Attach the decoded user payload (e.g., user ID) to the request object
    req.user = decoded;
    
    // 5. Move to the next middleware or controller function
    next();
  } catch (error) {
    // Handle invalid, altered, or expired tokens
    res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

export {authmiddleware}