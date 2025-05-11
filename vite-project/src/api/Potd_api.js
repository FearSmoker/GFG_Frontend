const BASE_URL = "http://localhost:8000/api/v1/problems/potd"; 

// Function to fetch (POTD)
export const getTodayProblem = async () => {
  try {
    const response = await fetch(`${BASE_URL}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch the problem of the day");
    }

    const data = await response.json();
    
    const { problem_id, problem_name, difficulty, description, problem_url } = data;

    return { problem_id, problem_name, difficulty, description, problem_url };
  } catch (error) {
    console.error("Error fetching problem of the day:", error);
    throw error;
  }
};
