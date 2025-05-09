const BASE_URL = "http://localhost:5000/api/v1/potd"; 

// Function to fetch (POTD)
export const getTodayProblem = async () => {
  try {
    const response = await fetch(`${BASE_URL}/potd`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch the problem of the day");
    }

    const data = await response.json();
    
    const { problemId, problemName, difficulty, problemDescription, problemLink } = data;

    return { problemId, problemName, difficulty, problemDescription, problemLink };
  } catch (error) {
    console.error("Error fetching problem of the day:", error);
    throw error;
  }
};
