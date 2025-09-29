const BASE_URL = "https://gfg-backend-rjtn.onrender.com/api/v1/events";


const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  
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

// Helper function to get auth headers for FormData requests (no Content-Type)
const getAuthHeadersForFormData = () => {
  const token = localStorage.getItem('access_token');
  
  if (!token) {
    console.error('No access token found');
    throw new Error('Authentication required');
  }
  
  const cleanToken = token.replace(/^["']|["']$/g, '').trim();
  
  return {
    'Authorization': `Bearer ${cleanToken}`
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

// Add a new event
export async function addEvent(eventData) {
  try {
    
    const headers = getAuthHeadersForFormData();
    
    const res = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers,
      body: eventData, 
    });
    
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || errorData.message || "Failed to add event");
    }
    
    return await res.json();
  } catch (error) {
    console.error("Add event error:", error);
    throw error;
  }
}

// Update an event 
export async function updateEvent(id, eventData) {
  try {
    const headers = getAuthHeadersForFormData();
    
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers,
      body: eventData,
    });
    
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || errorData.message || "Failed to update event");
    }
    
    return await res.json();
  } catch (error) {
    console.error("Update event error:", error);
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
      throw new Error(errorData.error || errorData.message || "Failed to delete event");
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


export async function fetchEventTeamInfo(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}/team-info`);
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to fetch event team info");
    }
    return await res.json();
  } catch (error) {
    console.error("Fetch event team info error:", error);
    throw error;
  }
}