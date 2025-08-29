const BASE_URL = "https://gfg-backend-rjtn.onrender.com/api/v1/users";

export const googleLoginAPI = async (code) => {
  const res = await fetch(`${BASE_URL}/googlelogin?code=${code}`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Google login failed");
  }

  const data = await res.json();
  const { accessToken, refreshToken, user } = data;

  return { accessToken, refreshToken, user };
};
