const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');

// @route   POST /api/leads
// @desc    Submit / create a new lead
router.post('/', async (req, res) => {
  try {
    const { name, phone, email, requirement, channel, notes } = req.body;

    if (!name || !phone || !email || !requirement) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, phone, email, and requirement.'
      });
    }

    const lead = new Lead({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      requirement: requirement.trim(),
      channel: channel || 'Website Form',
      notes: notes || ''
    });

    const savedLead = await lead.save();

    res.status(201).json({
      success: true,
      message: 'Lead received and recorded successfully',
      data: savedLead
    });
  } catch (error) {
    console.error('Error creating lead:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error creating lead'
    });
  }
});

// @route   GET /api/leads/stats
// @desc    Get aggregate stats for dashboard
router.get('/stats', async (req, res) => {
  try {
    const totalLeads = await Lead.countDocuments();
    const newLeads = await Lead.countDocuments({ status: 'New' });
    const contactedLeads = await Lead.countDocuments({ status: 'Contacted' });
    const reactivatedLeads = await Lead.countDocuments({ status: 'Reactivated' });
    const closedLeads = await Lead.countDocuments({ status: 'Closed' });

    const conversionRate = totalLeads > 0 
      ? Math.round((reactivatedLeads / totalLeads) * 100) 
      : 0;

    res.json({
      success: true,
      data: {
        totalLeads,
        newLeads,
        contactedLeads,
        reactivatedLeads,
        closedLeads,
        conversionRate
      }
    });
  } catch (error) {
    console.error('Error fetching lead stats:', error);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving lead statistics'
    });
  }
});

// @route   GET /api/leads
// @desc    Get all leads with optional filtering and search
router.get('/', async (req, res) => {
  try {
    const { status, search, limit = 50, page = 1 } = req.query;
    const query = {};

    if (status && status !== 'All') {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { requirement: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Lead.countDocuments(query);
    const leads = await Lead.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.json({
      success: true,
      count: leads.length,
      total,
      data: leads
    });
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching leads'
    });
  }
});

// @route   GET /api/leads/:id
// @desc    Get single lead by ID
router.get('/:id', async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }
    res.json({ success: true, data: lead });
  } catch (error) {
    console.error('Error fetching lead details:', error);
    res.status(500).json({ success: false, message: 'Server error fetching lead' });
  }
});

// @route   PATCH /api/leads/:id
// @desc    Update lead status or details
router.patch('/:id', async (req, res) => {
  try {
    const { status, notes, aiScore } = req.body;
    const updates = {};
    if (status) updates.status = status;
    if (notes !== undefined) updates.notes = notes;
    if (aiScore !== undefined) updates.aiScore = aiScore;
    if (status === 'Contacted' || status === 'Reactivated') {
      updates.lastContactedAt = new Date();
    }

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }

    res.json({
      success: true,
      message: 'Lead updated successfully',
      data: lead
    });
  } catch (error) {
    console.error('Error updating lead:', error);
    res.status(500).json({ success: false, message: 'Server error updating lead' });
  }
});

// @route   POST /api/leads/:id/reactivate
// @desc    Simulate AI reactivation trigger
router.post('/:id/reactivate', async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }

    lead.status = 'Reactivated';
    lead.lastContactedAt = new Date();
    lead.notes = (lead.notes ? lead.notes + '\n' : '') + `[${new Date().toLocaleTimeString()}] AI Outreach Campaign triggered. Lead engaged & reactivated.`;
    await lead.save();

    res.json({
      success: true,
      message: 'AI Reactivation workflow triggered successfully',
      data: lead
    });
  } catch (error) {
    console.error('Error reactivating lead:', error);
    res.status(500).json({ success: false, message: 'Server error reactivating lead' });
  }
});

// @route   DELETE /api/leads/:id
// @desc    Delete a lead
router.delete('/:id', async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }
    res.json({ success: true, message: 'Lead deleted successfully' });
  } catch (error) {
    console.error('Error deleting lead:', error);
    res.status(500).json({ success: false, message: 'Server error deleting lead' });
  }
});

module.exports = router;
