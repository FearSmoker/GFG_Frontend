const BASE_URL = "http://localhost:8000/api/v1/events";

// Helper function to get auth headers with proper token validation
const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  
  console.log('Token from localStorage:', token);
  
  if (!token) {
    console.error('No access token found');
    throw new Error('Authentication required');
  }
  
  const cleanToken = token.replace(/^["']|["']$/g, '').trim();
  
  return {
    'Authorization': `Bearer ${cleanToken}`,
    'Content-Type': 'application/json'
  };
};

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

// Add a new event (updated with new fields)
export async function addEvent(eventData) {
  try {
    const token = localStorage.getItem('access_token');
    
    if (!token) {
      throw new Error('Authentication required');
    }
    
    const cleanToken = token.replace(/^["']|["']$/g, '').trim();
    
    const res = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${cleanToken}`
      },
      body: eventData,
    });
    
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to add event");
    }
    
    return await res.json();
  } catch (error) {
    console.error("Add event error:", error);
    throw error;
  }
}

// Delete event by ID
export async function deleteEvent(id) {
  try {
    const headers = getAuthHeaders();
    
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers
    });
    
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to delete event");
    }
    
    return await res.json();
  } catch (error) {
    console.error("Delete event error:", error);
    throw error;
  }
}

// Get event by ID
export async function fetchEventById(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to fetch event");
    }
    return await res.json();
  } catch (error) {
    console.error("Fetch event error:", error);
    throw error;
  }
}