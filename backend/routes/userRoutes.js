const express = require('express');
const router = express.Router();

// User registration route
router.post('/register', (req, res) => {
  // Is jaga par user register ka code aayega
  res.send('User registered');
});

module.exports = router;