const express = require('express');
const router = express.Router();
const authorize = require('../middleware/authorize'); // Path to middleware

router.get('/admin-data', authorize(['ADMIN']), (req, res) => {
  res.json({ message: 'Welcome, Admin!' });
});

router.get('/moderator-data', authorize(['ADMIN', 'MODERATOR']), (req, res) => {
  res.json({ message: 'Welcome, Moderator or Admin!' });
});

router.get('/user-data', authorize(['USER', 'ADMIN', 'MODERATOR']), (req, res) => {
  res.json({ message: 'Welcome, User!' });
});

module.exports = router;
