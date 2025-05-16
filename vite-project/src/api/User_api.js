const BASE_URL = "http://localhost:8000/api/v1/users";

// Register user
export const registerUser = async (formData) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    body: formData,
  });
  const data = await response.json();

  const { fullName, email, username, avatar } = data;

  return { fullName, email, username, avatar };
};

// Login user
export const loginUser = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!response.ok) {
      let errorMessage = "Login failed";
      try {
        const errorData = await response.json();
        console.log("Error response body:", errorData);
        errorMessage =
          errorData.message ||
          errorData.error ||
          errorData.detail ||
          errorMessage;
      } catch (parseError) {
        console.error("Failed to parse error response:", parseError);
      }
      throw new Error(errorMessage);
    }

    const responseData = await response.json();
    console.log("Response Data:", responseData);

    const { user, accessToken, refreshToken } = responseData.data;

    if (!user || !accessToken) {
      throw new Error("Missing user or accessToken in the response");
    }

    if (refreshToken) {
      localStorage.setItem("refresh_token", refreshToken);
    }

    return {
      userId: user._id,
      username: user.username,
      email: user.email,
      token: accessToken,
      refreshToken: refreshToken,
    };
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

// Logout user
export const logoutUser = async () => {
  const accessToken = localStorage.getItem("access_token");

  try {
    const response = await fetch(`${BASE_URL}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Logout failed:", data);
    } else {
      console.log("Logout successful:", data);
    }

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    return data;
  } catch (err) {
    console.error("Logout error:", err);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }
};

// Refresh token
export const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refresh_token");
    
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }
    
    const response = await fetch(`${BASE_URL}/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
      credentials: "include",
    });
    
    if (!response.ok) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      throw new Error("Failed to refresh token");
    }
    
    const data = await response.json();
    
    if (data.accessToken) {
      localStorage.setItem("access_token", data.accessToken);
    }
    
    if (data.refreshToken) {
      localStorage.setItem("refresh_token", data.refreshToken);
    }
    
    return data;
  } catch (error) {
    console.error("Refresh token error:", error);
    throw error;
  }
};

// Change current password
export const changePassword = async (data) => {
  const response = await fetch(`${BASE_URL}/change-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });
  const dataResponse = await response.json();

  const { successMessage } = dataResponse;

  return { successMessage };
};

// Get current user
export const getCurrentUser = async () => {
  try {
    const accessToken = localStorage.getItem("access_token");
    
    const response = await fetch(`${BASE_URL}/current-user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });
    
    if (response.status === 401) {
      try {
        await refreshAccessToken();
        const newToken = localStorage.getItem("access_token");
        const retryResponse = await fetch(`${BASE_URL}/current-user`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${newToken}`,
          },
          credentials: "include",
        });
        return retryResponse.json();
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);
        throw refreshError;
      }
    }
    
    return response.json();
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw error;
  }
};

// Get profile
export const getProfile = async () => {
  const response = await fetch(`${BASE_URL}/get-profile`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await response.json();

  const { fullName, email, username, mobileNo, avatar } = data;

  return { fullName, email, username, mobileNo, avatar };
};

// Update account details
export const updateAccountDetails = async (data) => {
  const response = await fetch(`${BASE_URL}/update-account`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });
  const {
    data: { fullName, email, mobileNo },
  } = await response.json();
  return { fullName, email, mobileNo };
};

// Update avatar
export const updateUserAvatar = async (formData) => {
  const response = await fetch(`${BASE_URL}/avatar`, {
    method: "PATCH",
    body: formData,
    credentials: "include",
  });
  return response.json();
};