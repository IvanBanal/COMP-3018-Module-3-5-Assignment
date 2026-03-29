import Joi from "joi";

/**
 * @openapi
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       required:
 *         - name
 *         - date
 *         - capacity
 *         - status
 *         - category
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the event
 *           example: "event_123abc"
 *         name:
 *           type: string
 *           minLength: 3
 *           maxLength: 100
 *           description: Event title
 *           example: "Tech Conference 2026"
 *         date:
 *           type: string
 *           format: date-time
 *           description: Event date in ISO format
 *           example: "2026-06-15T09:00:00Z"
 *         capacity:
 *           type: integer
 *           description: Maximum number of attendees
 *           example: 150
 *         registrationCount:
 *           type: integer
 *           description: Number of registered participants
 *           example: 0
 *         status:
 *           type: string
 *           enum: [active, cancelled, completed]
 *           default: active
 *           description: Event status
 *         category:
 *           type: string
 *           enum: [conference, workshop, meetup, seminar, general]
 *           default: general
 *           description: Event category
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: When the event was created
 *           example: "2026-01-01T10:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: When the event was last updated
 *           example: "2026-01-05T12:00:00Z"
 */
export const createEventSchema = Joi.object({
    name: Joi.string().min(3).required(),
    
    date: Joi.date().iso().greater("now").required(),

    capacity: Joi.number().integer().min(5).required(),

    // Using Joi.ref("capacity"), we can reference the value of "capacity".
    registrationCount: Joi.number().integer().min(0).max(Joi.ref("capacity")).default(0),

    status: Joi.string().valid("active", "cancelled", "completed").default("active"),

    category: Joi.string().valid("conference", "workshop", "meetup", "seminar", "general").default("general"),
});