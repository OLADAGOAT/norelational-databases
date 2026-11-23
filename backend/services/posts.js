
const Post = require("../models/post");

// TODO 1: Return all posts with author details
async function findAll() {
  return Post.find().populate("author", "name email avatar");
}

// TODO 2: Find a post by ID
async function findById(id) {
  return Post.findById(id).populate("author", "name email avatar");
}

// TODO 3: Create a new post
async function create(body) {
  const post = await Post.create(body);
  return post.populate("author", "name email avatar");
}

// TODO 4: Update a post by ID
async function update(id, body) {
  return Post.findByIdAndUpdate(
    id,
    body,
    { new: true }
  ).populate("author", "name email avatar");
}

// TODO 5: Delete a post by ID
async function remove(id) {
  return Post.findByIdAndDelete(id);
}

module.exports = { findAll, findById, create, update, remove };
