import express from 'express';
import Events from '../models/events.js'

const router = express.Router();

router.get('/submitrouter', (req, res) => {
    return res.status(200).json(`submitevent router`)
})

router.post('/submitEvent', (req, res) => {
    const newEvent = new Events(
        null,
        req.body.name_of_event,
        req.body.type,
        req.body.date,
        req.body.start_time,
        req.body.end_time,
        req.body.name_of_venue,
        req.body.address,
        req.body.city,
        req.body.postal_code,
        req.body.short_description,
        req.body.description,
        req.body.virtual_link,
        req.body.image_url,
        req.body.contact_name,
        req.body.contact_email,
        req.body.contact_phone,
        req.body.name_organization,
        req.body.price,
        req.body.event_link
    )
    newEvent.save();
    console.log(newEvent);

    return res.status(201).json(`Event created!`);
})
// router.get('/submitevent/:eventId', async (req, res) => {
//     try {
//         const eventId = req.params.eventId;
//         const event = await Events.findById(eventId);

//         if (!event) {
//             return res.status(404).json({ message: 'Event not found' });
//         }

//         return res.status(200).json({ event });
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// });

export default router;