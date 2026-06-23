import { StreamChat } from "stream-chat";
import "dotenv/config";

const streamClient = StreamChat.getInstance(process.env.STREAM_API_KEY, process.env.STREAM_SECRET_KEY);

export async function upsertStreamUser(userData) {
  try {
    await streamClient.upsertUser(userData);
  } catch (error) {
    console.error("Error upserting Stream user:", error);
  }
}

export async function upsertStreamUsers(userData) {
  try {
    await streamClient.upsertUsers([userData]);
    // This can be used to upsert (update or insert) upto 100 users at once.
  } catch (error) {
    console.error("Error upserting Stream users:", error);
  }
}

export function generateStreamToken(userId) {
  try {
    return streamClient.createToken(userId.toString());
  } catch (error) {
    console.error("Error generating Stream token:", error);
  }
}