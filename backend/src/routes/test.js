const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Member = require("../models/member");
const Article = require("../models/article");

// get member data
router.get("/members", async (req, res) => {
  try {
    const members = await Member.find(
      {},
      "username intro exchage_school_name region"
    ); // column names
    res.json({ members });
  } catch (error) {
    console.error("Failed to fetch members:", error);
    res.status(500).json({ error: "Failed to fetch members" });
  }
});

// get article data
router.get("/article", async (req, res) => {
  try {
    // const article = await Article.find({}, 'article_title article_pic post_date status creator_id'); // column names
    const article = await Article.find(
      {},
      "creator_id like_by_user_ids save_by_user_ids comment_ids"
    ); // column names
    res.json({ article });
  } catch (error) {
    console.error("Failed to fetch article:", error);
    res.status(500).json({ error: "Failed to fetch article" });
  }
});

module.exports = router;
