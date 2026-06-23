import FriendRequest from "../models/FriendRequest.model.js";
import User from "../models/User.model.js";

export async function getRecommendedUsers(req, res) {
  try {
    const currentUserId = req.user._id;
    const currentUser = req.user;
    const recommendedUsers = await User.find({
      _id: {
        $ne: currentUserId, // Exclude the current user
        $nin: currentUser.friends, // Exclude friends
      },
      isOnboarded: true,
    }).select("-password");
    res.status(200).json({ recommendedUsers: recommendedUsers });
  } catch (error) {
    console.error("Error in getRecommendedUsers controller:", error);
    res.status(500).json({ message: "Internal Server error" });
  }
}

export async function getMyFriends(req, res) {
  try {
    const user = await User.findById(req.user._id).populate("friends", "-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ friends: user.friends });
  } catch (error) {
    console.error("Error in getMyFriends controller:", error);
    res.status(500).json({ message: "Internal Server error" });
  }
}

export async function sendFriendRequest(req, res) {
  try {
    const senderId = req.user._id;
    const recipientId = req.params.id;

    // Check if the recipient exists
    const recipient = await User.findById(recipientId);
    if(!recipient) {
      return res.status(404).json({ message: "Recipient not found" });
    }

    // Check if the sender is trying to send a friend request to themselves
    if (senderId.toString() === recipientId) {
      return res.status(400).json({ message: "You cannot send a friend request to yourself" });
    }

    // Check if they are already friends
    if (recipient.friends.includes(senderId)) {
      return res.status(400).json({ message: "You are already friends with this user" });
    }

    // Check if a friend request has already been sent
    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: senderId, recipient: recipientId },
        { sender: recipientId, recipient: senderId },
      ],
      status: "pending"
    });

    if (existingRequest) {
      return res.status(400).json({ message: "A friend request is already pending between you and this user" });
    }

    const friendRequest = await FriendRequest.create({
      sender: senderId,
      recipient: recipientId,
    });

    res.status(201).json({ message: "Friend request sent successfully", friendRequest });
  } catch (error) {
    console.error("Error in sendFriendRequest controller:", error);
    res.status(500).json({ message: "Internal Server error" });
  }
}

export async function acceptFriendRequest(req, res) {
  try {
    const friendRequestId = req.params.id;

    const friendRequest = await FriendRequest.findById(friendRequestId);
    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    if (friendRequest.sender.toString() == req.user._id.toString()) {
      return res.status(403).json({ message: "You are not authorized to accept this friend request" });
    }

    if (friendRequest.status === "accepted") {
      return res.status(400).json({ message: "This friend request has already been accepted" });
    }

    friendRequest.status = "accepted";
    await friendRequest.save();

    // Add each other to friends list
    await User.findByIdAndUpdate(friendRequest.sender, { $push: { friends: friendRequest.recipient } });
    await User.findByIdAndUpdate(friendRequest.recipient, { $push: { friends: friendRequest.sender } });

    res.status(200).json({ message: "Friend request accepted successfully" });
  } catch (error) {
    console.error("Error in acceptFriendRequest controller:", error);
    res.status(500).json({ message: "Internal Server error" });
  }
}

export async function getFriendRequests(req, res) {
  try {
    const pendingRequests = await FriendRequest.find({ 
      recipient: req.user._id, 
      status: "pending" 
    }).populate("sender", "-password");

    const acceptedRequests = await FriendRequest.find({
      sender: req.user._id,
      status: "accepted"
    }).populate("recipient", "-password");

    res.status(200).json({ "pendingRequests": pendingRequests, "acceptedRequests": acceptedRequests });
  } catch (error) {
    console.error("Error in getFriendRequests controller:", error);
    res.status(500).json({ message: "Internal Server error" });
  }
}

export async function getOutgoingFriendRequests(req, res) {
  try {
    const outgoingRequests = await FriendRequest.find({
      sender: req.user._id,
      status: "pending"
    }).populate("recipient", "-password");
    res.status(200).json({ "outgoingRequests": outgoingRequests });
  } catch (error) {
    console.error("Error in getOutgoingFriendRequests controller:", error);
    res.status(500).json({ message: "Internal Server error" });
  }
};