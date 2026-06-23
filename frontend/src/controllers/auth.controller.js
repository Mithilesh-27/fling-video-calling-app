import ApiClient from "../utils/apiClient";

export const register = async (registerData) => {
  const response = await ApiClient.post("/auth/register", registerData);
  return response.data;
};

export const login = async (loginData) => {
  const response = await ApiClient.post("/auth/login", loginData);
  return response.data;
};
export const logout = async () => {
  const response = await ApiClient.post("/auth/logout");
  return response.data;
};

export const getAuthUser = async () => {
  try {
    const res = await ApiClient.get("/auth/check-auth");
    return res.data;
  } catch (error) {
    console.error("Error in getAuthUser:", error);
    return null;
  }
};