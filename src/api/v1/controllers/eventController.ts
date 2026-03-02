import { Request, Response } from "express";
import * as service from "../services/eventService";
import { HTTP_STATUS } from "../../../constants/httpConstants";

/**
 * This is a controller to create a new event.
 */
export const createEvent = async (req: Request, res: Response) => {
    const event = await service.createEventService(req.body);

    return res.status(HTTP_STATUS.CREATED).json({
        message: "Event created",
        data: event,
    });
};

/**
 * This is a controller to retrieve all events.
 */
export const getAllEvents = async (_req: Request, res: Response) => {
    const events = await service.getAllEventsService();
    res.status(HTTP_STATUS.OK).json(events);
};

/**
 * This is a controller to retrieve an event by ID.
 */
export const getEventById = async (req: Request, res: Response) => {
    const event = await service.getEventByIdService(req.params.id);

    if (!event) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Event not found" });
    }

    res.status(HTTP_STATUS.OK).json(event);
};

/**
 * This is a controller to update an event by ID.
 */
export const updateEvent = async (req: Request, res: Response) => {
    const updated = await service.updateEventService(req.params.id, req.body);

    if (!updated) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Event not found" });
    }
    
    res.status(HTTP_STATUS.OK).json(updated);
};

/**
 * This is a controller to delete an event by ID.
 */
export const deleteEvent = async (req: Request, res: Response) => {
    const deleted = await service.deleteEventService(req.params.id);

    if (!deleted) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Event not found" });
    }

    res.status(HTTP_STATUS.OK).json({ message: "Event deleted"});
};