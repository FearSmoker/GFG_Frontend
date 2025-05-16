const BASE_URL = "http://localhost:8000/api/v1/events";

// Get all events
export async function fetchEvents() {
  try {
    const res = await fetch(`${BASE_URL}`);
    if (!res.ok) throw new Error("Failed to fetch events");
    return await res.json();
  } catch (error) {
    console.error("Fetch events error:", error);
    return [];
  }
}

// Add a new event
export async function addEvent(eventData) {
  try {
    const res = await fetch(`${BASE_URL}`, {
      method: "POST",
      body: eventData,
    });
    if (!res.ok) throw new Error("Failed to add event");
    return await res.json();
  } catch (error) {
    console.error("Add event error:", error);
    return null;
  }
}

// Delete event by ID
export async function deleteEvent(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete event");
    return await res.json();
  } catch (error) {
    console.error("Delete event error:", error);
    return null;
  }
}
