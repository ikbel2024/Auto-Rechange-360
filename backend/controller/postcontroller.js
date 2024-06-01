var express = require('express');
var Post = require('../model/post');

async function show (req, res, next) {
    try{
      const data= await Post.find();
      res.json(data);
    }catch(err){
      console.log(err);
    }
  }

  async function add (req, res, next) {
    try{
      const post = new Post(req.body);
      await post.save();
      res.status(200).send('add sucess');
    }catch(err){
      console.log(err);
    }
    
  }

  async function update (req, res, next) {
    try{
      await Post.findByIdAndUpdate(req.params.id,req.body);
      res.send('updated');
    }catch(err){
      console.log(err);
    }
  }

  async function dlete (req, res, next) {
    try{
      await Post.findByIdAndDelete(req.params.id, req.body);
      res.send('removed');
    } catch (err) {
      console.log(err);
    }
  }

  async function findid (req, res, next) {
    try{
      const data= await Post.findById(req.params.id);
      res.json(data);
    }catch(err){
      console.log(err);
    }
  }

  async function findname (req, res, next) {
    try{
      console.log(req.params.name)
      const data= await Post.findOne(req.params);
      res.json(data);
    }catch(err){
      console.log(err);
    }
  }

  async function showByViews(req, res, next) {
    try {
        // Find all posts and sort by views in descending order
        const data = await Post.find().sort({ views: -1 });
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}

async function findByUserId(req, res, next) {
  try {
      const data = await Post.find({ iduser: req.params.iduser });
      res.json(data);
  } catch (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
  }
}
async function copyPostWithNewUser(req, res, next) {
  try {
      // Extract the id and new iduser from the request parameters
      const postId = req.params.id;
      const newIdUser = req.params.iduser;

      // Find the post by ID from the request parameters
      const originalPost = await Post.findById(postId);

      if (!originalPost) {
          return res.status(404).send('Post not found');
      }

      // Create a new post object with the original data but a new iduser
      const newPost = new Post({
          iduser: newIdUser, // Use the new iduser from the request parameters
          name: originalPost.name,
          post: originalPost.post,
          likes: originalPost.likes,
          views: originalPost.views
      });

      // Save the new post to the database
      await newPost.save();
      res.status(200).send('Post copied successfully');
  } catch (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
  }
}

async function incrementLikes(req, res, next) {
  try {
      // Extract the post ID from the request parameters
      const postId = req.params.id;

      // Find the post by ID and increment the likes by one
      const updatedPost = await Post.findByIdAndUpdate(
          postId,
          { $inc: { likes: 1 } },
          { new: true } // Return the updated document
      );

      if (!updatedPost) {
          return res.status(404).send('Post not found');
      }

      res.json(updatedPost);
  } catch (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
  }
}

async function incrementViews(req, res, next) {
  try {
      // Extract the post ID from the request parameters
      const postId = req.params.id;

      // Find the post by ID and increment the views by one
      const updatedPost = await Post.findByIdAndUpdate(
          postId,
          { $inc: { views: 1 } },
          { new: true } // Return the updated document
      );

      if (!updatedPost) {
          return res.status(404).send('Post not found');
      }

      res.json(updatedPost);
  } catch (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
  }
}


module.exports ={ show , add, update, dlete ,findid, findname, showByViews, findByUserId, copyPostWithNewUser, incrementLikes, incrementViews };