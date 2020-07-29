//  routes/posts.js

const express = require('express');
const Posts = require('./../models/posts');

const postsRouter = new express.Router();

//const User = require('../models/User.model');
const mongoose = require('mongoose');
const routeGuard = require('../configs/route-guard.config');

const multer = require('multer');
const cloudinary = require('cloudinary');
const multerStorageCloudinary = require('multer-storage-cloudinary');

const storage = new multerStorageCloudinary.CloudinaryStorage({
  cloudinary: cloudinary.v2
});

const upload = multer({ storage });

postsRouter.get('/postForm', routeGuard, (request, response) => {
  response.render('posts/postForm');
});

postsRouter.post('/postForm', routeGuard, upload.single('pictures'), (request, response, next) => {
  const url = request.file.path;
  const { content } = request.body;

  Posts.create({
    content,
    creator: request.session.currentUser._id,
    picPath: url,
    picName: request.file.filename
  })
    .then(post => {
      console.log('this is a post:', post);
      response.redirect('/');
    })
    .catch(error => {
      next(error);
    });
});

postsRouter.get('/posts', (request, response, next) => {
  Posts.find
    .populate('creator')
    .then(post => {
      if (post) {
        response.render('posts/posts', { posts: post });
      } else {
        next();
      }
    })
    .catch(error => {
      next(error);
    });
});

module.exports = postsRouter;
