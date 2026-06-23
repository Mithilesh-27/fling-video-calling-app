import { generateStreamToken } from "../utils/stream.util.js";

export function getStreamToken(req, res) {
  try {
    const token = generateStreamToken(req.user._id);
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error in getStreamToken controller:", error);
    res.status(500).json({ message: "Internal Server error" });
  }
}