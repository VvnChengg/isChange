const Member = require("../models/member");

const modifyInfo = async (req, res) => {
  const data = {
    user_id: req.body.user_id,
    intro: req.body.intro,
    photo: req.body.photo,
  };
  const updatedUser = await Member.findOneAndUpdate(
    { user_id: user_id }, // Search condition
    {
      $set: {
        intro: intro,
        photo: photo,
      },
    },
    { new: true } // Return the updated document
  );

  try {
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return success response
    return res.json({
      status: "success",
      message: "User information updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const showInfo = async (req, res) => {
  const userID = req.body.user_id;
  if (!userID) {
    return res.status(400).json({ error: "User ID is missing" });
  }
  try {
    const user = await Member.findOne({ user_id: userID }, "intro photo");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ user });
  } catch (error) {
    console.error("Failed to fetch user info:", error);
    res.status(500).json({ error: "Failed to fetch user info" });
  }
};

const showDetailedInfo = async (req, res) => {
  const userID = req.body.user_id;
  if (!userID) {
    return res.status(400).json({ error: "User ID is missing" });
  }
  try {
    const user = await Member.findOne(
      { user_id: userID },
      "intro photo exchage_school_name region"
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ user });
  } catch (error) {
    console.error("Failed to fetch user info:", error);
    res.status(500).json({ error: "Failed to fetch user info" });
  }
};

module.exports = {
  modifyInfo,
  showInfo,
  showDetailedInfo,
};
