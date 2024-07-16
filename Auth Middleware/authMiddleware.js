// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../Models/User');

const auth = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(400).json({ message: 'Token not provided' });
  }
  const token = authHeader.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    req.user = decoded;
    if (!user) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized' });
  }
};

const admin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};

// const manager = (req, res, next) => {
//   console.log(req.user.role)
//   if (req.user.role !== 'admin' && req.user.role !== 'manager') {
//     return res.status(403).json({ message: 'Access denied' });
//   }
//   next();
// };
const adminOrManager = (req, res, next) => {
  if (req.user.role !== 'admin' && req.user.role !== 'manager') {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};
const noStaff = (req, res, next) => {
  if (req.user.role === 'staff') {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};

module.exports = { auth, admin, adminOrManager, noStaff };
