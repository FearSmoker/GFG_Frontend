const BASE_URL = "https://gfg-backend-rjtn.onrender.com/api/v1/users";

// Register user
export const registerUser = async (formData) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    body: formData,
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    const error = new Error(data.message || 'Registration failed');
    error.response = {
      status: response.status,
      data: data
    };
    throw error;
  }

  return data;
};

// Verify email OTP
export const verifyEmailOTP = async (email, otp) => {
  const response = await fetch(`${BASE_URL}/verify-email-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, otp }),
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    const error = new Error(data.message || 'OTP verification failed');
    error.response = {
      status: response.status,
      data: data
    };
    throw error;
  }

  return data;
};

// Resend OTP
export const resendOTP = async (email) => {
  const response = await fetch(`${BASE_URL}/resend-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    const error = new Error(data.message || 'Failed to resend OTP');
    error.response = {
      status: response.status,
      data: data
    };
    throw error;
  }

  return data;
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
  const token = localStorage.getItem('access_token');
  
  const response = await fetch(`${BASE_URL}/change-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(data),
    credentials: "include",
  });
  
  const responseData = await response.json();

  if (!response.ok) {
    const error = new Error(responseData.message || 'Failed to change password');
    error.response = {
      status: response.status,
      data: responseData
    };
    throw error;
  }

  return responseData;
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

// Helper function to get auth headers with proper token validation for admin routes
const getAdminAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  
  if (!token) {
    throw new Error('Authentication required');
  }
  
  const cleanToken = token.replace(/^["']|["']$/g, '').trim();
  
  return {
    'Authorization': `Bearer ${cleanToken}`,
    'Content-Type': 'application/json'
  };
};

// Get pending registrations (Admin only)
export const getPendingRegistrations = async (params = {}) => {
  try {
    const headers = getAdminAuthHeaders();
    const queryParams = new URLSearchParams(params).toString();
    const url = queryParams ? `${BASE_URL}/admin/pending-registrations?${queryParams}` : `${BASE_URL}/admin/pending-registrations`;

    const response = await fetch(url, {
      method: "GET",
      headers
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch pending registrations");
    }
    
    return data;
  } catch (error) {
    console.error("Fetch pending registrations error:", error);
    throw error;
  }
};

// Get all registrations with status (Admin only)
export const getAllRegistrationsWithStatus = async (params = {}) => {
  try {
    const headers = getAdminAuthHeaders();
    const queryParams = new URLSearchParams(params).toString();
    const url = queryParams ? `${BASE_URL}/admin/all-registrations?${queryParams}` : `${BASE_URL}/admin/all-registrations`;

    const response = await fetch(url, {
      method: "GET",
      headers
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch registrations");
    }
    
    return data;
  } catch (error) {
    console.error("Fetch all registrations error:", error);
    throw error;
  }
};

// Approve registration (Admin only)
export const approveRegistration = async (registrationId, approvalNotes = '') => {
  try {
    const headers = getAdminAuthHeaders();
    
    const response = await fetch(`${BASE_URL}/admin/approve/${registrationId}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ approvalNotes })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || "Failed to approve registration");
    }
    
    return data;
  } catch (error) {
    console.error("Approve registration error:", error);
    throw error;
  }
};

// Deny registration (Admin only)
export const denyRegistration = async (registrationId, approvalNotes = '') => {
  try {
    const headers = getAdminAuthHeaders();
    
    const response = await fetch(`${BASE_URL}/admin/deny/${registrationId}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ approvalNotes })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || "Failed to deny registration");
    }
    
    return data;
  } catch (error) {
    console.error("Deny registration error:", error);
    throw error;
  }
};

// Get registration statistics (Admin only)
export const getRegistrationStats = async () => {
  try {
    const headers = getAdminAuthHeaders();
    
    const response = await fetch(`${BASE_URL}/admin/registration-stats`, {
      method: "GET",
      headers
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch registration statistics");
    }
    
    return data;
  } catch (error) {
    console.error("Fetch registration stats error:", error);
    throw error;
  }
};