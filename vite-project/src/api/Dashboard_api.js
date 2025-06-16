const BASE_URL = "http://localhost:8000/api/v1/dashboard";

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
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
    if (!res.ok) throw new Error(data.message || "Failed to fetch dashboard data");
    return data;
  } catch (error) {
    console.error("Dashboard data error:", error);
    throw error;
  }
}

// Get detailed event history
export async function getEventHistory(params = {}) {
  try {
    const queryParams = new URLSearchParams(params).toString();
    const url = queryParams ? `${BASE_URL}/history?${queryParams}` : `${BASE_URL}/history`;
    
    const res = await fetch(url, {
      method: "GET",
      headers: getAuthHeaders()
    });
    
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch event history");
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
    if (!res.ok) throw new Error(data.message || "Failed to fetch spending analytics");
    return data;
  } catch (error) {
    console.error("Spending analytics error:", error);
    throw error;
  }
}