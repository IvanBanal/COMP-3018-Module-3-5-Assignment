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