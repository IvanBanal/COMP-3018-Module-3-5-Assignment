import Joi from "joi";
import { createEventSchema } from "../../src/api/v1/validation/eventSchema";

describe("Event Validation Schema", () => {
  it("should fail if 'name' is missing", () => {
    // Arrange
    const payload = {
      date: "2026-03-25T09:00:00.000Z",
      capacity: 200,
    };

    // Act
    const { error } = createEventSchema.validate(payload);

    // Assert
    expect(error).toBeDefined();
    expect(error?.message).toContain('"name" is required');
  });

  it("should fail if 'date' is in the past", () => {
    // Arrange
    const payload = {
      name: "Past Event",
      date: "2020-01-01T00:00:00.000Z",
      capacity: 50,
    };

     // Act
    const { error } = createEventSchema.validate(payload);

    // Assert
    expect(error).toBeDefined();
    expect(error?.message).toContain('"date" must be greater than "now"');
  });

  it("should fail if 'capacity' is less than 5", () => {
    // Arrange
    const payload = {
      name: "Small Event",
      date: "2026-03-25T09:00:00.000Z",
      capacity: 2,
    };

    // Act
    const { error } = createEventSchema.validate(payload);

    // Assert
    expect(error).toBeDefined();
    expect(error?.message).toContain('"capacity" must be greater than or equal to 5');
  });

  it("should pass with all valid fields and apply defaults", () => {
    // Arrange
    const payload = {
      name: "Valid Event",
      date: "2026-03-25T09:00:00.000Z",
      capacity: 10,
    };

    // Act
    const { error, value } = createEventSchema.validate(payload);

    // Assert
    expect(error).toBeUndefined();
    expect(value.registrationCount).toBe(0); 
    expect(value.status).toBe("active");     
    expect(value.category).toBe("general");  
  });
});