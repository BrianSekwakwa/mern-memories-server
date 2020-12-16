import express from "express";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  updateLikeCount,
} from "../controllers/posts.js";

// Initializing Routes
const router = express.Router();

// Creating Routes and Endpoints
router.get("/", getPosts);
router.post("/", createPost);
router.patch("/:id", updatePost);
router.patch("/updateLikes/:id", updateLikeCount);
router.delete("/:id", deletePost);

export default router;
