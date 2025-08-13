const express = require('express');
const mongoose = require('mongoose');
const path = require('path'); // Path module import kiya gaya
const app = express();
app.use(express.json());
const PORT = 5000;

// Database Connection URI
const uri = "mongodb+srv://sunshine:a0RrYHT9ZHuKsVfL@cluster0.liyvi9u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Mongoose se MongoDB ko connect karen
mongoose.connect(uri)
  .then(() => console.log('Successfully connected to MongoDB!'))
  .catch(err => console.error('Connection failed:', err));

// Routes
app.use('/api/tickets', require('./routes/ticketRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
    // Static build folder serve karega
    app.use(express.static(path.join(__dirname, '../frontend/build')));

    // Baqi sab requests ko React app mein redirect karega
    app.get('*', (req, res) =>
        res.sendFile(
            path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
        )
    );
} else {
    // Development mein yeh message dikhaega
    app.get('/', (req, res) => res.send('Please set to production'));
}

// Server ko start karen
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});