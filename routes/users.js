import express from "express";
import { verifyToken } from "../middleware/auth.js";
import{
    getUser,
    getUserFriends,
    addRemoveFriend
} from "../controllers/users.js";
// import { getUser } from "../controllers/users.js";
const router = express.Router();
//All read
router.get("/:id",verifyToken,getUser);
router.get("/:id/friends",verifyToken,getUserFriends);
//update query
router.patch("/:id/addRemoveFriend",verifyToken,addRemoveFriend);
export default router;
