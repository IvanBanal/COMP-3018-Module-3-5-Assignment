import { db } from "../../../../config/firebaseConfig";
import { Event } from "../models/eventModel";

const COLLECTION = "events";

/**
 * This will create a new event in Firestore.
 * @param event - Event object to save.
 * @returns The saved Event.
 */
export const createEventRepo = async (event: Event): Promise<Event> => {
  const docRef = db.collection(COLLECTION).doc(event.id!);
  await docRef.set(event);
  return event;
};

/**
 * This will retrieve all events from Firestore.
 * @returns Array of events.
 */
export const getAllEventsRepo = async (): Promise<Event[]> => {
    const snapshot = await db.collection(COLLECTION).get();
    return snapshot.docs.map((doc: any) => doc.data());
};

/**
 * This will retrieve a single event by ID.
 * @param id - event ID
 * @returns Event or null if not found.
 */
export const getEventByIdRepo = async (id: string): Promise<Event | null> => {
    const doc = await db.collection(COLLECTION).doc(id).get();
    if (!doc.exists) return null;
    return doc.data() as Event;
};

/**
 * This will update an existing event in Firestore.
 * @param id - Event ID.
 * @param updates - The fields to update.
 * @returns Updated event or null if not found.
 */
export const updateEventRepo = async (id: string, updates: Partial<Event>): Promise<Event | null> => {
    const docRef = db.collection(COLLECTION).doc(id);
    const doc = await docRef.get();
    if (!doc.exists) return null;

    await docRef.update(updates);
    const updated = await docRef.get();
    return updated.data() as Event;
};


/**
 * This will delete an event by ID.
 * @param id - Event ID.
 * @returns True if deleted, and false if not found.
 */
export const deleteEventRepo = async (id: string): Promise<boolean> => {
    const docRef = db.collection(COLLECTION).doc(id);
    const doc = await docRef.get();
    if (!doc.exists) return false;

    await docRef.delete();
    return true;
};



