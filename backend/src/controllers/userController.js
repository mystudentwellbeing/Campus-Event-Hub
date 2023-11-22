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
  for (const prop in req.body) {
    req.foundUser[prop] = req.body[prop];
  }
  await req.foundUser.update();
  return res.status(200).json({
    status: 'success',
    data: {
      user: req.foundUser.toJSON(),
    },
  });
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
