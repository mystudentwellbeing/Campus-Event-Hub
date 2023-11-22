import express from 'express';
import institutionController from '../controllers/institutionController.js';

const router = express.Router();

router.route('/').get(institutionController.getAllInsts);

router
  .route('/:instId')
  .get(institutionController.getInst)
  .patch(institutionController.updateInst)
  .delete(institutionController.deleteInst);

export default router;
