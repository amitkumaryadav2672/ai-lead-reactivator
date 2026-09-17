const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email address'
      ]
    },
    requirement: {
      type: String,
      required: [true, 'Requirement details are required'],
      trim: true
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Reactivated', 'Closed'],
      default: 'New'
    },
    aiScore: {
      type: Number,
      min: 0,
      max: 100,
      default: () => Math.floor(Math.random() * 25) + 75 // Realistic initial engagement score 75-99
    },
    channel: {
      type: String,
      default: 'Website Form'
    },
    notes: {
      type: String,
      default: ''
    },
    lastContactedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

// Index for fast search and sorting
LeadSchema.index({ createdAt: -1 });
LeadSchema.index({ status: 1 });
LeadSchema.index({ name: 'text', email: 'text', requirement: 'text' });

module.exports = mongoose.model('Lead', LeadSchema);
