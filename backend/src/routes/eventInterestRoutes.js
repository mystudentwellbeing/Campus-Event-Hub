import express from 'express';
import eventInterestController from '../controllers/eventInterestController.js';

const router = express.Router();

router.route('/').get(eventInterestController.getAllEventsSavedByUser);
router.route('/:eventId').get(eventInterestController.getAllUsersSavedEvent);
router.route('/:eventId').post(eventInterestController.saveEvent);
router.route('/:eventId').delete(eventInterestController.unsaveEvent);

export default router;
