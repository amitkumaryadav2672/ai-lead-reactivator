require('dotenv').config();
const mongoose = require('mongoose');
const Lead = require('./models/Lead');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ai-lead-reactivator';

const sampleLeads = [
  {
    name: 'Sarah Jenkins',
    phone: '+1 (555) 234-5678',
    email: 'sarah.jenkins@fintechcloud.io',
    requirement: 'Reactivating 2,500 dormant Q3 enterprise SaaS signups with personalized WhatsApp & Email triggers.',
    status: 'New',
    aiScore: 94,
    channel: 'Website Form',
    notes: 'High intent prospect, ready for multi-channel pilot.'
  },
  {
    name: 'David Zhao',
    phone: '+1 (555) 876-5432',
    email: 'd.zhao@apexlogistics.com',
    requirement: 'Need AI agent to follow up with 10k abandoned quote requests from freight customers.',
    status: 'Contacted',
    aiScore: 88,
    channel: 'Website Form',
    notes: 'Sent introductory demo video; customer requested pricing proposal.'
  },
  {
    name: 'Elena Rostova',
    phone: '+44 20 7946 0912',
    email: 'elena@novamarkets.co.uk',
    requirement: 'Automated reactivation workflow for high-net-worth real estate buyers who stopped responding.',
    status: 'Reactivated',
    aiScore: 97,
    channel: 'Website Form',
    notes: 'Reactivation sequence converted lead to booking a 1-on-1 strategy call.'
  },
  {
    name: 'Marcus Thorne',
    phone: '+1 (555) 432-1098',
    email: 'mthorne@cloudscale.net',
    requirement: 'API integration to plug into Salesforce CRM and automatically nudge stale pipeline opportunities.',
    status: 'New',
    aiScore: 82,
    channel: 'Website Form',
    notes: 'Looking for 14-day trial for their 12 sales reps.'
  },
  {
    name: 'Priya Sharma',
    phone: '+91 98201 45678',
    email: 'priya.s@edunext.in',
    requirement: 'Re-engage 15,000 students who downloaded course syllabus but never completed enrollment.',
    status: 'Reactivated',
    aiScore: 91,
    channel: 'Website Form',
    notes: 'Triggered conversational WhatsApp flow; 340 enrollments generated in batch 1.'
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log(`Connected to MongoDB at ${MONGODB_URI}`);

    const existingCount = await Lead.countDocuments();
    if (existingCount === 0) {
      await Lead.insertMany(sampleLeads);
      console.log(`✅ Seeded ${sampleLeads.length} sample leads successfully!`);
    } else {
      console.log(`ℹ️ Database already contains ${existingCount} leads. Skipping seed.`);
    }

    await mongoose.disconnect();
    console.log('Database connection closed.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding database:', err.message);
    process.exit(1);
  }
}

seedDatabase();
