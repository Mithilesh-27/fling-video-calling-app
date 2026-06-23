import ApiClient from "../utils/apiClient";

export const completeOnboarding = async (userData) => {
  const response = await ApiClient.post("/auth/onboarding", userData);
  return response.data;
};

export async function getUserFriends() {
  const response = await ApiClient.get("/users/friends");
  return response.data.friends;
}

export async function getRecommendedUsers() {
  const response = await ApiClient.get("/users");
  return response.data.recommendedUsers;
}

export async function getOutgoingFriendReqs() {
  const response = await ApiClient.get("/users/friend-requests/outgoing");
  return response.data.outgoingRequests;
}

export async function sendFriendRequest(userId) {
  const response = await ApiClient.post(`/users/friend-request/send/${userId}`);
  return response.data;
}

export async function getFriendRequests() {
  const response = await ApiClient.get("/users/friend-requests");
  return response.data;
}

export async function acceptFriendRequest(requestId) {
  const response = await ApiClient.put(`/users/friend-request/accept/${requestId}`);
  return response.data;
}

export async function getStreamToken() {
  const response = await ApiClient.get("/chat/token");
  return response.data;
}