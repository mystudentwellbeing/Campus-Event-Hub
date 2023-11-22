import express from 'express';
import userController from '../controllers/userController.js';
import {
  restrictTo,
  validateUpdateUserData,
  findUser,
} from '../middlewares/userMiddleware.js';

const router = express.Router();

router.param('userId', findUser);

router.route('/').get(restrictTo, userController.getAllUsers);

router
  .route('/:userId')
  .get(restrictTo, userController.getUser)
  .patch(restrictTo, validateUpdateUserData, userController.updateUser)
  .delete(restrictTo, userController.deleteUser);

export default router;
