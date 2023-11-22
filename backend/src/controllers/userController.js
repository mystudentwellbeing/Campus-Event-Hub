import argon2 from 'argon2';
import User from '../models/userModel.js';

const getAllUsers = async (req, res) => {
  const allUsers = await User.findAll();
  return res.status(200).json({
    status: 'success',
    results: allUsers.length,
    data: {
      users: allUsers,
    },
  });
};

const getUser = (req, res) => {
  return res.status(200).json({
    status: 'success',
    data: {
      user: req.foundUser.toJSON(),
    },
  });
};

const updateUser = async (req, res) => {
  try {
    // Check if there's a new password in the request
    if (req.body.password) {
      // Verify the old password
      if (!(await req.foundUser.isPasswordValid(req.body.oldPassword))) {
        return res.status(401).json({ message: 'Old password is incorrect.' });
      }
      // Hash the new password
      const hashedNewPassword = await argon2.hash(req.body.password);
      // Explicitly set the new hashed password
      req.foundUser.password = hashedNewPassword;
    }

    // Update other fields, excluding password and oldPassword
    for (const prop in req.body) {
      if (prop !== 'password' && prop !== 'oldPassword') {
        req.foundUser[prop] = req.body[prop];
      }
    }

    // Save the updated user
    await req.foundUser.update();

    // Send response
    return res.status(200).json({
      status: 'success',
      data: {
        user: req.foundUser.toJSON(),
      },
    });
  } catch (error) {
    // Handle any errors
    return res.status(500).json({ message: 'Error updating user.', error });
  }
};

const deleteUser = async (req, res) => {
  await req.foundUser.delete();
  return res.status(204).json({
    status: 'success',
    data: null,
  });
};

const userController = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};

export default userController;
