const REGISTRATION_BASE_URL = "https://gfg-backend-rjtn.onrender.com/api/v1/registrations";

// Helper function to get auth headers with proper token validation
const getRegistrationAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  
  if (!token) {
    console.error('No access token found for registration');
    throw new Error('Please log in to register for events');
  }
  
  const cleanToken = token.replace(/^["']|["']$/g, '').trim();
  
  if (!cleanToken.includes('.') || cleanToken.split('.').length !== 3) {
    console.error('Invalid token format:', cleanToken);
    localStorage.removeItem('access_token');
    throw new Error('Invalid authentication token. Please log in again.');
  }
  
  return {
    'Authorization': `Bearer ${cleanToken}`,
    'Content-Type': 'application/json'
  };
};

// Register for an event
export async function registerForEvent(eventId) {
  try {
    const headers = getRegistrationAuthHeaders();
    
    const res = await fetch(`${REGISTRATION_BASE_URL}/register/${eventId}`, {
      method: "POST",
      headers
    });
    
    const data = await res.json();
    
    if (!res.ok) {
      console.error('Registration failed:', data);
      throw new Error(data.message || "Failed to register for event");
    }
    
    return data;
  } catch (error) {
    console.error("Registration error:", error);
    
    if (error.message.includes('jwt malformed') || error.message.includes('invalid token')) {
      localStorage.removeItem('access_token');
      throw new Error('Your session has expired. Please log in again.');
    }
    
    throw error;
  }
}

// Cancel registration using MongoDB _id
export async function cancelRegistration(registrationId) {
  try {
    const headers = getRegistrationAuthHeaders();
    
    const res = await fetch(`${REGISTRATION_BASE_URL}/cancel/${registrationId}`, {
      method: "PUT",
      headers
    });

    const data = await res.json();
    
    if (!res.ok) {
      console.error('Cancel registration failed:', data);
      throw new Error(data.message || "Failed to cancel registration");
    }
    
    return data;
  } catch (error) {
    if (error.message.includes('jwt malformed') || error.message.includes('invalid token')) {
      localStorage.removeItem('access_token');
      throw new Error('Your session has expired. Please log in again.');
    }
    
    throw error;
  }
}

// Get user's registrations
export async function getUserRegistrations(params = {}) {
  try {
    const headers = getRegistrationAuthHeaders();
    const queryParams = new URLSearchParams(params).toString();
    const url = queryParams ? `${REGISTRATION_BASE_URL}/my-registrations?${queryParams}` : `${REGISTRATION_BASE_URL}/my-registrations`;

    const res = await fetch(url, {
      method: "GET",
      headers
    });

    const data = await res.json();
    
    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch registrations");
    }
    
    return data;
  } catch (error) {
    if (error.message.includes('jwt malformed') || error.message.includes('invalid token')) {
      localStorage.removeItem('access_token');
      throw new Error('Your session has expired. Please log in again.');
    }
    
    throw error;
  }
}

// Get registration details using MongoDB _id
export async function getRegistrationDetails(registrationId) {
  try {
    const headers = getRegistrationAuthHeaders();
    
    const res = await fetch(`${REGISTRATION_BASE_URL}/details/${registrationId}`, {
      method: "GET",
      headers
    });

    const data = await res.json();
    
    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch registration details");
    }
    
    return data;
  } catch (error) {
    if (error.message.includes('jwt malformed') || error.message.includes('invalid token')) {
      localStorage.removeItem('access_token');
      throw new Error('Your session has expired. Please log in again.');
    }
    
    throw error;
  }
}