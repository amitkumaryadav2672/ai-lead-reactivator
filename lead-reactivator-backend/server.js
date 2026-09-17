require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const leadRoutes = require('./routes/leadRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ai-lead-reactivator';

// Middleware
app.use(cors({
  origin: '*', // Allow all origins for dev testing (Admin + Website)
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Routes
app.use('/api/leads', leadRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'AI Lead Reactivator Backend',
    timestamp: new Date(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Root welcome endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'AI Lead Reactivator API is active',
    documentation: '/api/leads',
    health: '/api/health'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Resource not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
});

// Connect to MongoDB & start server
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log(`Connected to MongoDB successfully at ${MONGODB_URI}`);
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    // Still start server so API can respond with helpful error if DB is down
    app.listen(PORT, () => {
      console.log(`Server running with DB warning on http://localhost:${PORT}`);
    });
  });
