import eventService from '../services/eventService.js';
// const eventService = require('./services/eventService');

const eventsController = {
  createEvent: async (req, res) => {
    console.log('create event -> controller');
    const eventData = req.body;
    const createdEventId = await eventService.createEvent(eventData);
    res.json({ eventId: createdEventId });
    // res.json({uu:"kjhj"});
  },

  // Implement other eventController functions (getEvent, updateEvent, deleteEvent, listEvents)
};
export default eventsController;


