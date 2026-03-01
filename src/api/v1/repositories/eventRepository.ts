import { db } from "../../../../config/firebaseConfig";
import { Event } from "../models/eventModel";

const COLLECTION = "events";

/**
 * This will create a new event in Firestore.
 * @param event - Event object to save.
 * @returns The saved Event.
 */
export const createEventRepo = async (event: Event): Promise<Event> => {
  const docRef = db.collection(COLLECTION).doc(event.id);
  await docRef.set(event);
  return event;
};




