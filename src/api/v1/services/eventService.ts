import { Event } from "../models/eventModel";
import * as repo from "../repositories/eventRepository";

let counter = 1;

/**
 * This will generate a unique Event ID like evt_000001.
 * @returns Event ID string.
 */
const generateId = () => {
    /**
     * counter++ will use the current value of counter and increase 
     * it by 1 for the next call.
     * .padStart makes the string at least 6 characters long and if 
     * it's shorter, it pads with "0" at the start.
     */
    return `evt_${String(counter++).padStart(6, "0")}`;
};

/**
 * This will create a new event and saves it to Firestore.
 * @param data - Event input data.
 * @returns Created Event with generated fields.
 */
export const createEventService = async (data: Event) => {
    const now = new Date().toISOString();
    const event: Event = {
        ...data, 
        id: generateId(),
        createdAt: now,
        updatedAt: now,
    };
    return await repo.createEventRepo(event);
};

/**
 * This will retrieve all events.
 * @returns Array of events.
 */
export const getAllEventsService = async () => {
    return await repo.getAllEventsRepo();
};

/**
 * This will retrieve event by ID.
 * @param id - Event ID.
 * @returns Event or null.
 */
export const getEventByIdService = async (id: string) => {
    return await repo.getEventByIdRepo(id);
};

/**
 * This will update an existing event.
 * @param id - Event ID.
 * @param updates - The fields to update.
 * @returns Updated Event or null.
 */
export const updateEventService = async (id: string, updates: Partial<Event>) => {
    updates.updatedAt = new Date().toISOString();
    return await repo.updateEventRepo(id, updates);
};