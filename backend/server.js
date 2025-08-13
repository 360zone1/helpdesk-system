const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
const PORT = 5000;

// Database Connection URI
const uri = "mongodb+srv://sunshine:a0RrYHT9ZHuKsVfL@cluster0.liyvi9u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Mongoose se MongoDB ko connect karen
mongoose.connect(uri)
  .then(() => console.log('Successfully connected to MongoDB!'))
  .catch(err => console.error('Connection failed:', err));

// Test route
app.get('/', (req, res) => {
  res.send('Server is running and connected to database!');
});

app.use('/api/tickets', require('./routes/ticketRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Server ko start karen
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});