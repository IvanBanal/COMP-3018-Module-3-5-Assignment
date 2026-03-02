import { Router } from "express";
import * as controller from "../controllers/eventController";
import { validate } from "../middleware/validateMiddleware";
import { createEventSchema } from "../validation/eventSchema";

const router = Router();

// Event Routes.
router.post("/", validate(createEventSchema), controller.createEvent);
router.get("/", controller.getAllEvents);
router.get("/:id", controller.getEventById);
router.put("/:id", controller.updateEvent);
router.delete("/:id", controller.deleteEvent);

export default router;
