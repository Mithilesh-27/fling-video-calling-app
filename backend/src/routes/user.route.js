import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { acceptFriendRequest, getFriendRequests, getMyFriends, getOutgoingFriendRequests, getRecommendedUsers, sendFriendRequest } from '../controllers/user.controller.js';
import { get } from 'mongoose';
const router = express.Router();

router.get("/", protect, getRecommendedUsers);
router.get("/friends", protect, getMyFriends);
router.post("/friend-request/send/:id", protect, sendFriendRequest);
router.put("/friend-request/accept/:id", protect, acceptFriendRequest);
router.get("/friend-requests", protect, getFriendRequests);
router.get("/friend-requests/outgoing", protect, getOutgoingFriendRequests);


export default router;