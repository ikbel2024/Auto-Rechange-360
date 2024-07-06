var express = require('express');
var Post = require('../model/comment');

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

  async function findCommentsByUser(req, res, next) {
    try {
        const userId = req.params.iduser;

        // Find all comments by the given iduser
        const comments = await Post.find({ iduser: userId });

        // Send the comments as response
        res.json(comments);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}

async function findCommentsByPost(req, res, next) {
  try {
      const postId = req.params.idpost;

      // Find all comments by the given idpost
      const comments = await Post.find({ idpost: postId });

      // Send the comments as response
      res.json(comments);
  } catch (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
  }
}


module.exports ={ show , add, update, dlete ,findid, findname, findCommentsByUser, findCommentsByPost };