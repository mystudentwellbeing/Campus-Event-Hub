import express from 'express';
import eventController from '../controllers/eventController.js';
import {
  restrictTo,
  validateEventData,
  validateUpdateEventData,
  findEvent,
} from '../middlewares/eventMiddleware.js';

const router = express.Router();

router
  .route('/')
  .get(eventController.getAllEvents)
  .post(validateEventData, eventController.createEvent);

router.route('/myevents').get(eventController.getEventsByUser);

router
  .route('/:eventId')
  .get(findEvent, eventController.getEvent)
  .patch(
    findEvent,
    restrictTo,
    validateUpdateEventData,
    eventController.updateEvent
  )
  .delete(findEvent, restrictTo, eventController.deleteEvent);

export default router;
