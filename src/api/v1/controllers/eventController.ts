import { Request, Response } from "express";
import * as service from "../services/eventService";
import { HTTP_STATUS } from "../../../constants/httpConstants";

/**
 * This is a controller to create a new event.
 */
export const createEvent = async (req: Request, res: Response): Promise<void> => {
    const event = await service.createEventService(req.body);

    const responseData = {
        id: event.id,
        name: event.name,
        date: event.date,
        capacity: event.capacity,
        registrationCount: event.registrationCount,
        status: event.status,
        category: event.category,
        createdAt: event.createdAt,
        updatedAt: event.updatedAt,
    };

     res.status(HTTP_STATUS.CREATED).json({
        message: "Event created",
        data: responseData,
    });
};

/**
 * This is a controller to retrieve all events.
 */
export const getAllEvents = async (req: Request, res: Response) => {
    const events = await service.getAllEventsService();

    const formattedEvents = events.map((event: any) => ({
        ...event,
        date: event.date?.toDate
            ? event.date.toDate().toISOString()
            : event.date
    }));

    res.status(HTTP_STATUS.OK).json({
        message: "Events retrieved",
        count: formattedEvents.length,
        data: formattedEvents
    });
};
/**
 * This is a controller to retrieve an event by ID.
 */
export const getEventById = async (req: Request, res: Response) => {
  const event = await service.getEventByIdService(req.params.id);

  if (!event) {
    res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Event not found" });
    return;
  }

  const formatted = {
    id: event.id,
    name: event.name,
    date: event.date, // Already ISO string
    capacity: event.capacity,
    registrationCount: event.registrationCount,
    status: event.status,
    category: event.category,
    createdAt: event.createdAt,
    updatedAt: event.updatedAt,
  };

  res.status(HTTP_STATUS.OK).json({
    message: "Event retrieved",
    data: formatted,
  });
};

/**
 * This is a controller to update an event by ID.
 */
export const updateEvent = async (req: Request, res: Response) => {
  const updated = await service.updateEventService(req.params.id, req.body);

  if (!updated) {
    res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Event not found" });
    return;
  }

  const formatted = {
    id: updated.id,
    name: updated.name,
    date: updated.date,
    capacity: updated.capacity,
    registrationCount: updated.registrationCount,
    status: updated.status,
    category: updated.category,
    createdAt: updated.createdAt,
    updatedAt: updated.updatedAt,
  };

  res.status(HTTP_STATUS.OK).json({
    message: "Event updated",
    data: formatted,
  });
};

/**
 * This is a controller to delete an event by ID.
 */
export const deleteEvent = async (req: Request, res: Response) => {
  const deleted = await service.deleteEventService(req.params.id);

  if (!deleted) {
    res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Event not found" });
    return;
  }

  res.status(HTTP_STATUS.OK).json({
    message: "Event deleted",
  });
};