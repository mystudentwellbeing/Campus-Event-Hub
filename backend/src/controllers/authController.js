import jsonwebtoken from 'jsonwebtoken';
import argon2 from 'argon2';
import { v4 } from 'uuid';
import User from '../models/userModel.js';

const login = async (req, res) => {
  const { email, password } = req.body;

  const userFound = await User.findByEmail(req.body.email);
  if (!userFound) {
    return res.status(401).json({ message: 'Invalid username or password.' });
  }

  if (!(await userFound.isPasswordValid(password))) {
    return res.status(401).json({ message: 'Invalid username or password.' });
  }

  userFound.session_uuid = v4();
  await userFound.update();

  const token = jsonwebtoken.sign(
    { ...userFound.toJSON(), session_uuid: userFound.session_uuid },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

  return res.status(200).json({
    status: 'sucess',
    token,
  });
};

const signup = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findByEmail(req.body.email);
  if (existingUser) {
    return res.status(401).json({ message: 'Email already in use.' });
  }

  const hashedPassword = await argon2.hash(password);

  const newUser = new User(
    null,
    req.body.email,
    hashedPassword,
    null,
    null,
    null,
    null,
    v4()
  );

  await newUser.save();

  const token = jsonwebtoken.sign(
    { id: newUser.id, email: newUser.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  return res.status(201).json({
    status: 'success',
    data: {
      user: newUser.email,
      token,
    },
  });
};

const logout = async (req, res) => {
  await req.currentUser.logout();
  return res.status(200).json({ message: 'Logout successful.' });
};

const authController = {
  login,
  signup,
  logout,
};

export default authController;
