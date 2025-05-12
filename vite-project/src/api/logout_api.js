const BASE_URL = "http://localhost:8000/api/v1/users/logout";


export const logoutUser = async (token) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`  
      },
    });

    if (!response.ok) {
      throw new Error("Logout failed");
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};
