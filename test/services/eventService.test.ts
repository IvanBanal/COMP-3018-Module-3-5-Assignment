import * as service from "../../src/api/v1/services/eventService";
import * as repo from "../../src/api/v1/repositories/eventRepository";
import { Event } from "../../src/api/v1/models/eventModel";

// Mock the repository functions
jest.mock("../../src/api/v1/repositories/eventRepository");

describe("Event Service Functions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create an event", async () => {
    // Arrange
    const input: Partial<Event> = {
      name: "Test Event",
      date: "2026-03-25T09:00:00.000Z",
      capacity: 20,
    };

    const mockEvent: Event = {
      ...input,
      id: "evt_000001",
      registrationCount: 0,
      status: "active",
      category: "general",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as Event;

    (repo.createEventRepo as jest.Mock).mockResolvedValue(mockEvent);

    // Act
    const result = await service.createEventService(input);

    // Assert
    expect(result).toEqual(mockEvent);
    expect(repo.createEventRepo).toHaveBeenCalledWith(expect.objectContaining({
      name: "Test Event",
    }));
  });

  it("should retrieve all events", async () => {
    // Arrange
    const events: Event[] = [
      { id: "evt_000001", name: "A", date: "2026-03-25T09:00:00.000Z", capacity: 50, registrationCount: 0, status: "active", category: "general", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { id: "evt_000002", name: "B", date: "2026-03-26T09:00:00.000Z", capacity: 100, registrationCount: 0, status: "active", category: "general", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
    ];

    (repo.getAllEventsRepo as jest.Mock).mockResolvedValue(events);

    // Act
    const result = await service.getAllEventsService();

    // Assert
    expect(result).toEqual(events);
    expect(repo.getAllEventsRepo).toHaveBeenCalled();
  });

  it("should retrieve an event by ID", async () => {
    // Arrange
    const mockEvent: Event = {
      id: "evt_000001",
      name: "Test Event",
      date: "2026-03-25T09:00:00.000Z",
      capacity: 20,
      registrationCount: 0,
      status: "active",
      category: "general",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    (repo.getEventByIdRepo as jest.Mock).mockResolvedValue(mockEvent);

    // Act
    const result = await service.getEventByIdService("evt_000001");

    // Assert
    expect(result).toEqual(mockEvent);
    expect(repo.getEventByIdRepo).toHaveBeenCalledWith("evt_000001");
  });

  it("should update an event", async () => {
    // Arrange
    const updatedEvent: Partial<Event> = { name: "Updated Name" };
    const returnedEvent: Event = {
      id: "evt_000001",
      name: "Updated Name",
      date: "2026-03-25T09:00:00.000Z",
      capacity: 20,
      registrationCount: 0,
      status: "active",
      category: "general",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    (repo.updateEventRepo as jest.Mock).mockResolvedValue(returnedEvent);

    // Act
    const result = await service.updateEventService("evt_000001", updatedEvent);

    // Assert
    expect(result).toEqual(returnedEvent);
    expect(repo.updateEventRepo).toHaveBeenCalledWith("evt_000001", expect.objectContaining(updatedEvent));
  });

  it("should delete an event", async () => {
    // Arrange
    (repo.deleteEventRepo as jest.Mock).mockResolvedValue(true);
    
    // Act
    const result = await service.deleteEventService("evt_000001");

    // Assert
    expect(result).toBe(true);
    expect(repo.deleteEventRepo).toHaveBeenCalledWith("evt_000001");
  });
});