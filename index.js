import express from 'express';

const port = process.env.PORT || 5000;

const app = express();

// Load modules
// import eventService from './services/eventService.js';
import eventsController from './controllers/eventsController.js';
import eventService from './services/eventService.js';
// const eventService = require('./services/eventService');
// const eventsController = require('./controllers/eventsController.js');

// function logRequest(req, res, next) {
//   console.log('Request URL:', req.url);
//   next(); // Pass control to the next middleware or route handler
// }
// app.use(logRequest); // Use the middleware with `app.use`
app.use(express.json());
// Configure routes
app.use('/events', eventsController.createEvent);

// Start the server
app.listen(port, () => {
 console.log('http://localhost:5000');});
