const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      req.userData = { userId: 'demo-user', name: 'Guest User' };
      return next();
    }

    const token = authHeader.split(' ')[1];
    
    // Support demo-token for no-db fallback
    if (!token || token === 'demo-token' || token === 'null' || token === 'undefined') {
      req.userData = { userId: 'demo-user', name: 'Demo User' };
      return next();
    }

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET || 'secret');
      req.userData = { userId: decodedToken.userId, name: decodedToken.name };
      return next();
    } catch (jwtErr) {
      console.warn('Auth Middleware (JWT Expired/Invalid): Falling back to guest mode -', jwtErr.message);
      req.userData = { userId: 'demo-user', name: 'Guest User' };
      return next();
    }
  } catch (error) {
    console.error('Auth Middleware Error:', error.message);
    res.status(401).json({ message: 'Authentication failed: ' + error.message });
  }
};
