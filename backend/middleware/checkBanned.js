const User = require('../models/user');

const checkBanned = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.banned) {
      return res.status(403).json({ message: 'Your account is banned' });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = checkBanned;

