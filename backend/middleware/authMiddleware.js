const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const asyncHandler = require('./asyncHandler');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        res.status(401);
        throw new Error('Niste autorizovani, korisnik ne postoji');
      }

      next();
    } catch (error) {
      res.status(401);
      throw new Error('Niste autorizovani, token nije ispravan');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Niste autorizovani, nema tokena');
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Niste autorizovani kao admin');
  }
};

module.exports = { protect, admin };
