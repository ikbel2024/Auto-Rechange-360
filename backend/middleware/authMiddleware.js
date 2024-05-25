const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

const authMiddleware = (roles = []) => {
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return [
    (req, res, next) => {
      const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'Access denied, no token provided' });
      }

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
      } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
      }
      next();
    },
    (req, res, next) => {
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access denied, insufficient permissions' });
      }
      next();
    }
  ];
};

module.exports = authMiddleware;

