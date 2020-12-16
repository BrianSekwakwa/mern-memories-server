import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";

// -- GET Post
export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();

    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// -- CREATE Post
export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage(post);

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// -- UPDATE Post
export const updatePost = async (req, res) => {
  const _id = req.params.id;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No post with that id is available");
  }

  try {
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// -- UPDATE like count
export const updateLikeCount = async (req, res) => {
  const _id = req.params.id;
  const count = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No post with that id is available");
  }

  try {
    const updatedLikes = await PostMessage.findByIdAndUpdate(_id, count, {
      new: true,
    });
    res.status(200).json(updatedLikes);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// -- DELETE Post
export const deletePost = async (req, res) => {
  const _id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No post with that id is available");
  }
  try {
    const response = await PostMessage.findByIdAndDelete(_id);
    res.status(202).json(response);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
