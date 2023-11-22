import jsonwebtoken from 'jsonwebtoken';
import User from '../models/userModel.js';

const excludedPaths = ['/api/login', '/api/signup'];

const verifyToken = async (req, res, next) => {
  if (excludedPaths.includes(req.path)) {
    return next();
  }
  const authHeader = req.headers.authorization;

  const token = authHeader && authHeader.split(' ')[1];
  console.log('Received token:', token);
  if (!token) {
    return res.status(401).json({ message: 'You are not logged in!' });
  }

  try {
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);
    const user = await User.findById(decoded.user_id);
    console.log(
      'Database session_uuid vs Token session_uuid:',
      user.session_uuid,
      decoded.session_uuid
    );
    if (user.session_uuid !== decoded.session_uuid) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.currentUser = user;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'token is invalid' });
  }
};

export { verifyToken };
