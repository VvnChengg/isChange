const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Member = require('../models/member');

// get member data
router.get('/members', async (req, res) => {
    try {
        const members = await Member.find({}, 'username intro exchage_school_name region'); // column names
        res.json({ members });
    } catch (error) {
        console.error('Failed to fetch members:', error);
        res.status(500).json({ error: 'Failed to fetch members' });
    }
});

module.exports = router;
