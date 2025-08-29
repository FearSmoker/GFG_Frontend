import axios from "axios";

const API_BASE_URL = "https://gfg-backend-rjtn.onrender.com";

export const fetchVisitorCount = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/visitor-count/`, {
      withCredentials: true,
    });
    return response.data.count;
  } catch (error) {
    console.error("Failed to fetch visitor count", error);
    return null;
  }
};