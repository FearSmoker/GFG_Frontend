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
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });
  const responseData = await response.json();

  const { userId, username, email, token } = responseData;

  return { userId, username, email, token };
};

// Logout user
export const logoutUser = async () => {
  const response = await fetch(`${BASE_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });
  return response.json();
};

// Refresh token
export const refreshAccessToken = async () => {
  const response = await fetch(`${BASE_URL}/refresh-token`, {
    method: "POST",
    credentials: "include",
  });
  const data = await response.json();

  const { accessToken } = data;

  return { accessToken };
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
  const response = await fetch(`${BASE_URL}/current-user`, {
    method: "GET",
    credentials: "include",
  });
  return response.json();
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
  const dataResponse = await response.json();

  const { fullName, email } = dataResponse;

  return { fullName, email };
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
