const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    
    // Support demo-token for no-db fallback
    if (token === 'demo-token') {
      req.userData = { userId: 'demo-user', name: 'Demo User' };
      return next();
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = { userId: decodedToken.userId, name: decodedToken.name };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed!' });
  }
};
