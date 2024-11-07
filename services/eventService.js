import auth from '../config/config.js';
import { calendar } from '@googleapis/calendar';
import { google } from 'googleapis';

const eventService = {

    createEvent: async (eventData) => {
         const calendar = google.calendar({ version: 'v3', auth });
        let existingCalendar = null;
        try {
            existingCalendar = await calendar.calendarList.list(
            //     {
            //     auth: auth,
            //     calendarId: 'Eventer',
            // }
            );
        } catch (error) {
            console.error('Error checking calendar list:', error);
        }

        // Create the calendar if it doesn't exist
        if (!existingCalendar?.data?.items?.length) { // Check for existence within response
            try {
                await calendar.calendars.insert({
                    // auth: auth,
                    resource: {
                        summary: 'Eventer Calendar', // Replace with desired name
                        timeZone: 'Israel', // Set your desired time zone
                    },
                });
            } catch (error) {
                // Handle calendar creation error (optional)
                console.error('Error creating calendar:', error);
            }
        }

        // Insert the event into the calendar
        try {
            const googleEvent = {
                summary: eventData.name,
                description: eventData.description,
                start: {
                    dateTime: eventData.date,
                    timeZone: 'Israel',
                },
                end: {
                    dateTime: eventData.date,
                    timeZone: 'Israel',
                },
            }
            const createdEventId = await calendar.events.insert({
                // auth: auth,
                calendarId: 'primary',
                resource: googleEvent,
            });
            return createdEventId;
        } catch (error) {
            // Handle event insertion error
            console.error('Error inserting event:', error);
            // Consider returning an appropriate error message or status code
        }
        //         const response = await axios.post(
        //             auth.eventManagementServiceUrl,
        //             eventData
        //         );
        //         const createdEventId = response.data.id;
        //         // const createdEventId = '123';
        //         const googleEvent = {
        //             name: eventData.name,
        //             date: eventData.date,
        //             // summary: eventData.summary,
        //             description: eventData.description,
        //             // start: {
        //             //     dateTime: eventData.startDateTime,
        //             //     timeZone: 'Israel',
        //             // },
        //             // end: {
        //             //     dateTime: eventData.endDateTime,
        //             //     timeZone: 'Israel',
        //             // },
        //             // location: eventData.location,
        //             // organizer: {
        //             //     email: 'organizer@example.com',
        //             //     displayName: 'Organizer Name',
        //             // },
        //             // attendees: eventData.attendees.map((attendee) => {
        //             //     return {
        //             //         email: attendee.email,
        //             //         displayName: attendee.name,
        //             //     };
        //             // }),
        //         };

        //         await calendar.events.insert({
        //             auth: auth,
        //             calendarId: 'Eventer',
        //             resource: googleEvent,
        //         });

        //         return createdEventId;
    }
}

// Implement other eventService functions (getEvent, updateEvent, deleteEvent, listEvents)

export default eventService;

