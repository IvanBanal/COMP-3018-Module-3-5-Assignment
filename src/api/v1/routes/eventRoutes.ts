import { Router } from "express";
import * as controller from "../controllers/eventController";
import { validate } from "../middleware/validateMiddleware";
import { createEventSchema } from "../validation/eventSchema";

const router = Router();

// Event Routes.
/**
 * @openapi
 * /events:
 *   post:
 *     summary: Create a new event
 *     description: Add a new event to the system
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - date
 *               - capacity
 *               - status
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Tech Conference 2026"
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-06-15T09:00:00Z"
 *               capacity:
 *                 type: number
 *                 example: 150
 *               registrationCount:
 *                 type: number
 *                 example: 0
 *               status:
 *                 type: string
 *                 enum: [active, cancelled, completed]
 *                 example: "active"
 *               category:
 *                 type: string
 *                 enum: [conference, workshop, meetup, seminar, general]
 *                 example: "conference"
 *     responses:
 *       '201':
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Event created"
 *                 data:
 *                   $ref: '#/components/schemas/Event'
 *       '400':
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Missing required field: name"
 *       '401':
 *         description: Unauthorized - Missing or invalid authentication token
 *       '500':
 *         description: Internal server error
 */
router.post("/", validate(createEventSchema), controller.createEvent);

/**
 * @openapi
 * /events:
 *   get:
 *     summary: Retrieve all events
 *     description: Get a list of all events
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Events retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Events retrieved"
 *                 count:
 *                   type: number
 *                   example: 2
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Event'
 *       '401':
 *         description: Unauthorized - Missing or invalid authentication token
 *       '500':
 *         description: Internal server error
 */
router.get("/", controller.getAllEvents);

/**
 * @openapi
 * /events/{id}:
 *   get:
 *     summary: Retrieve a single event
 *     description: Get details of an event by its ID
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Event retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Event retrieved"
 *                 data:
 *                   $ref: '#/components/schemas/Event'
 *       '404':
 *         description: Event not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Event not found"
 *       '401':
 *         description: Unauthorized - Missing or invalid authentication token
 *       '500':
 *         description: Internal server error
 */
router.get("/:id", controller.getEventById);
router.put("/:id", controller.updateEvent);
router.delete("/:id", controller.deleteEvent);

export default router;
