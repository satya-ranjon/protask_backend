const eventService = require("../services/eventService");

/**
 * Controller function to create an event.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const createEvent = async (req, res, next) => {
  try {
    // Destructure data from the request object
    const { title, description, date, starttime, endtime, sleipner } = req.body;

    // Call the eventService to create the event using the provided data
    const event = await eventService.createEvent({
      title,
      description,
      date,
      starttime,
      endtime,
      sleipner,
    });

    // Respond with the created event object
    res.status(201).json(event);
  } catch (error) {
    // Handle errors gracefully
    next(error);
  }
};

/**
 * Update an existing event by its ID.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const updateEvent = async (req, res, next) => {
  try {
    // Extract the event ID to update from the request parameters
    const eventIdToUpdate = req.params.eventId;

    // Extract updated event data from the request body
    const { title, description, date, starttime, endtime, sleipner } = req.body;

    // Call the eventService's updateEvent function to perform the update
    const updatedEvent = await eventService.updateEvent(
      {
        title,
        description,
        date,
        starttime,
        endtime,
        sleipner,
      },
      eventIdToUpdate
    );

    // Respond with the updated event object
    res.status(200).json(updatedEvent);
  } catch (error) {
    // Pass any encountered errors to the error handling middleware
    next(error);
  }
};

/**
 * Delete an event by its ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const deleteEvent = async (req, res, next) => {
  try {
    // Get the event ID to delete from the request parameters
    const eventIdToDelete = req.params.eventId;

    // Call the eventService's deleteEvent function to remove the event
    const message = await eventService.deleteEvent(eventIdToDelete);

    // Respond with a success message
    res.status(200).json(message);
  } catch (error) {
    // Pass any errors to the error handling middleware
    next(error);
  }
};

module.exports = { createEvent, updateEvent, deleteEvent };
