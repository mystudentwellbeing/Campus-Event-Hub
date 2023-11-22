import User from '../models/userModel.js';

// Middleware to restrict
const restrictTo = async (req, res, next) => {
  if (!req.currentUser) {
    return res.status(403).json({ message: 'You are not logged in' });
  }

  const userIdBeingAccessed = Number(req.params.userId);
  if (
    req.currentUser.is_admin !== 1 &&
    req.currentUser.id !== userIdBeingAccessed
  ) {
    return res.status(403).json({ message: 'You do not have permission' });
  }

  next();
};

// Middleware to validate user data for creation
const validateUserData = (req, res, next) => {
  const requiredProperties = ['email', 'password'];

  let missingProperties = [];

  requiredProperties.forEach((prop) => {
    if (!req.body.hasOwnProperty(prop)) {
      missingProperties.push(prop);
    }
  });

  if (missingProperties.length) {
    return res.status(400).json({
      status: 'fail',
      message: `Missing properties: ${missingProperties.join(', ')}`,
    });
  }

  next();
};

// Middleware to validate user data for update
const validateUpdateUserData = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .json({ error: 'Please provide at least one property to update.' });
  }

  next();
};

// Middleware to find a user by ID
const findUser = async (req, res, next) => {
  const userId = Number(req.params.userId);
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({
      status: 'fail',
      message: `Cannot find User with ID: ${userId}`,
    });
  }

  req.foundUser = user;
  next();
};

export { restrictTo, validateUserData, validateUpdateUserData, findUser };
