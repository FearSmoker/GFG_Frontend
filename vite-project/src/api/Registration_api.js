const REGISTRATION_BASE_URL = "https://gfg-backend-rjtn.onrender.com/api/v1/registrations";

// Helper function to get auth headers with proper token validation
const getRegistrationAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  
  console.log('Registration Token from localStorage:', token);
  
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
    console.log('Attempting to register for event:', eventId);
    
    const headers = getRegistrationAuthHeaders();
    console.log('Headers being sent:', { ...headers, Authorization: '[HIDDEN]' });
    
    const res = await fetch(`${REGISTRATION_BASE_URL}/register/${eventId}`, {
      method: "POST",
      headers
    });

    console.log('Registration response status:', res.status);
    
    const data = await res.json();
    
    if (!res.ok) {
      console.error('Registration failed:', data);
      throw new Error(data.message || "Failed to register for event");
    }
    
    // Log the registration ID (MongoDB _id) for tracking
    if (data.registration && data.registration._id) {
      console.log('Registration successful with ID:', data.registration._id);
    } else if (data.registrationId) {
      console.log('Registration successful with ID:', data.registrationId);
    }
    
    console.log('Registration successful:', data);
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
    console.log('Attempting to cancel registration with ID:', registrationId);
    
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
    
    console.log('Registration cancelled successfully:', registrationId);
    return data;
  } catch (error) {
    console.error("Cancel registration error:", error);
    
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
    console.log('Fetching user registrations with params:', params);
    
    const headers = getRegistrationAuthHeaders();
    const queryParams = new URLSearchParams(params).toString();
    const url = queryParams ? `${REGISTRATION_BASE_URL}/my-registrations?${queryParams}` : `${REGISTRATION_BASE_URL}/my-registrations`;

    const res = await fetch(url, {
      method: "GET",
      headers
    });

    const data = await res.json();
    
    if (!res.ok) {
      console.error('Fetch registrations failed:', data);
      throw new Error(data.message || "Failed to fetch registrations");
    }
    
    // Log registration IDs for tracking
    if (data.registrations && Array.isArray(data.registrations)) {
      const registrationIds = data.registrations.map(reg => reg._id).filter(Boolean);
      console.log('Fetched registrations with IDs:', registrationIds);
    }
    
    return data;
  } catch (error) {
    console.error("Fetch registrations error:", error);
    
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
    console.log('Fetching registration details for ID:', registrationId);
    
    const headers = getRegistrationAuthHeaders();
    
    const res = await fetch(`${REGISTRATION_BASE_URL}/details/${registrationId}`, {
      method: "GET",
      headers
    });

    const data = await res.json();
    
    if (!res.ok) {
      console.error('Fetch registration details failed:', data);
      throw new Error(data.message || "Failed to fetch registration details");
    }
    
    console.log('Registration details fetched successfully for ID:', registrationId);
    return data;
  } catch (error) {
    console.error("Fetch registration details error:", error);
    
    if (error.message.includes('jwt malformed') || error.message.includes('invalid token')) {
      localStorage.removeItem('access_token');
      throw new Error('Your session has expired. Please log in again.');
    }
    
    throw error;
  }
}