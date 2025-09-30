const BASE_URL = "https://gfg-backend-rjtn.onrender.com/api/v1/dashboard";

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('No authentication token found');
  }
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
};

// Get dashboard overview data
export async function getDashboardData() {
  try {
    const res = await fetch(`${BASE_URL}/`, {
      method: "GET",
      headers: getAuthHeaders()
    });
    
    const data = await res.json();
    
    if (!res.ok) {
      throw new Error(data.message || `HTTP error! status: ${res.status}`);
    }
    
    return data;
  } catch (error) {
    console.error("Dashboard data error:", error);
    throw error;
  }
}

// Get detailed event history
export async function getEventHistory(params = {}) {
  try {
    // Filter out undefined/null values from params
    const filteredParams = Object.entries(params).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        acc[key] = value;
      }
      return acc;
    }, {});
    
    const queryParams = new URLSearchParams(filteredParams).toString();
    const url = queryParams ? `${BASE_URL}/history?${queryParams}` : `${BASE_URL}/history`;
    
    const res = await fetch(url, {
      method: "GET",
      headers: getAuthHeaders()
    });
    
    const data = await res.json();
    
    if (!res.ok) {
      throw new Error(data.message || `HTTP error! status: ${res.status}`);
    }
    
    return data;
  } catch (error) {
    console.error("Event history error:", error);
    throw error;
  }
}

// Get spending analytics
export async function getSpendingAnalytics() {
  try {
    const res = await fetch(`${BASE_URL}/analytics`, {
      method: "GET",
      headers: getAuthHeaders()
    });
    
    const data = await res.json();
    
    if (!res.ok) {
      throw new Error(data.message || `HTTP error! status: ${res.status}`);
    }
    
    return data;
  } catch (error) {
    console.error("Spending analytics error:", error);
    throw error;
  }
}